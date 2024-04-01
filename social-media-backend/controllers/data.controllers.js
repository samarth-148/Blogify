/** @format */
const path = require("path");
const data = require("../models/data.models");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
const sharp = require("sharp");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

function ramdomUID(fileName) {
  return crypto.randomBytes(16).toString("hex") + fileName;
}

async function handleSearchData(req, res) {
  let isLoggedIn = req.isLoggedIn;
  let { data: keywords } = req.body;

  let dataToSend;

  if (isLoggedIn) {
    let id = req.id;
    let userPosts = await data.find({ createdBy: id });
    let publicPosts = await data.find({
      postType: "public",
      createdBy: { $ne: id },
    });
    dataToSend = [...userPosts, ...publicPosts];
  } else {
    dataToSend = await data.find({ postType: "public" });
  }

  dataToSend = await Promise.all(
    dataToSend.map(async (post) => {
      let isAuthorContains = keywords.some((keyword) =>
        post.author.includes(keyword)
      );
      let isDescriptionContains = keywords.some((keyword) =>
        post.description.includes(keyword)
      );
      if (isAuthorContains || isDescriptionContains) {
        let getpostParam = {
          Bucket: bucketName,
          Key: post.imageKey,
        };
        let command = new GetObjectCommand(getpostParam);
        let url = await getSignedUrl(client, command, { expiresIn: 3600 });
        return {
          _id: post._id,
          author: post.author,
          description: post.description,
          imageKey: post.imageKey,
          url: url,
        };
      }
      return null;
    })
  );

  dataToSend = dataToSend.filter((post) => post !== null);

  res.status(200).json({ data: dataToSend });
}

async function handleGetDataReq(req, res) {
  let isLoggedIn = req.isLoggedIn;
  let dataToSend;

  if (isLoggedIn) {
    let id = req.id;
    let userPosts = await data.find({ createdBy: id });
    let publicPosts = await data.find({
      postType: "public",
      createdBy: { $ne: id },
    });
    dataToSend = [...userPosts, ...publicPosts];
  } else {
    dataToSend = await data.find({ postType: "public" });
  }

  let newData = await Promise.all(
    dataToSend.map(async (data) => {
      let getDataParam = {
        Bucket: bucketName,
        Key: data.imageKey,
      };
      let command = new GetObjectCommand(getDataParam);
      let url = await getSignedUrl(client, command, { expiresIn: 3600 });
      return {
        _id: data._id,
        author: data.author,
        description: data.description,
        imageKey: data.imageKey,
        url: url,
      };
    })
  );
  res.status(200).json({ isLoggedIn, data: newData });
}

async function handlePostDataReq(req, res) {
  let newData = req.body;
  let imageKey = ramdomUID(req.file.originalname + Date.now());
  const buffer = await sharp(req.file.buffer)
    .resize({ height: 200, width: 200, fit: "contain" })
    .toBuffer();

  let id = req.id;
  const putObjParams = {
    Bucket: bucketName,
    Key: imageKey,
    Body: buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(putObjParams);
  await client.send(command);

  await data.create({
    author: newData.author,
    description: newData.description,
    postType: newData.postType,
    createdBy: id,
    imageKey: imageKey,
  });

  return res.status(200).json({ msg: "created" });
}

async function handlePatchDataReq(req, res) {
  try {
    let id = req.params.id;
    let userId = req.id;
    let dataToEdit = req.body;
    const user = await data.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { $set: dataToEdit },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or not authorized" });
    }
    res.status(200).json({ msg: "Updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Server error" });
  }
}

async function handleDeleteDataReq(req, res) {
  let id = req.params.id;
  let userId = req.id;
  const post = await data.findOne({ _id: id, createdBy: userId });
  if (post) {
    let deletParams = {
      Bucket: bucketName,
      Key: post.imageKey,
    };
    let command = new DeleteObjectCommand(deletParams);
    await client.send(command);
    await data.findByIdAndDelete(id);
    return res.status(200).json({ msg: "deleted" });
  }
  return res.status(404).json({ msg: "Post can not be deleted" });
}

module.exports = {
  handleGetDataReq,
  handlePostDataReq,
  handlePatchDataReq,
  handleDeleteDataReq,
  handleSearchData,
};

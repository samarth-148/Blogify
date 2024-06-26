/** @format */
const path = require("path");
const data = require("../models/data.models");
const User = require("../models/user.model");
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

function randomUID(fileName) {
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
        post.author.toLowerCase().includes(keyword.toLowerCase())
      );
      let isDescriptionContains = keywords.some((keyword) =>
        post.description.toLowerCase().includes(keyword.toLowerCase())
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
          description: post.description,
          imageKey: post.imageKey,
          createdAt: post.createdAt,
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
  let id = req.id;

  if (isLoggedIn) {
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

      let user = await User.find({ _id: data.createdBy });
      let userprofileUrl =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"; // Default profile image URL

      if (user.length > 0) {
        let userImageKey = user[0].imageKey;
        if (userImageKey) {
          let getUserProfileParam = {
            Bucket: bucketName,
            Key: userImageKey,
          };
          let getProfileImgCommand = new GetObjectCommand(getUserProfileParam);
          userprofileUrl = await getSignedUrl(client, getProfileImgCommand, {
            expiresIn: 3600,
          });
        }
      }

      return {
        _id: data._id,
        description: data.description,
        imageKey: data.imageKey,
        postType: data.postType,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        url: url,
        profileUrl: userprofileUrl,
      };
    })
  );

  res.status(200).json({ isLoggedIn, data: newData, userId: id });
}

async function handlePostDataReq(req, res) {
  let newData = req.body;
  let imageKey = randomUID(req.file.originalname + Date.now());
  let id = req.id;
  const putObjParams = {
    Bucket: bucketName,
    Key: imageKey,
    Body: req.file.buffer,
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

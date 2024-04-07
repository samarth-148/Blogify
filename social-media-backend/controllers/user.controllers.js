/** @format */
const crypto = require("crypto");
const sharp = require("sharp");
const User = require("../models/user.model");
const { setUser } = require("../service/auth.service");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const isUserFind = await User.findOne({ email, password });
  if (!isUserFind) {
    return res.status(404).json({ Login: false });
  }
  const token = await setUser(isUserFind);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    sameSite: "None",
    path: "/",
  });

  return res.status(200).json({ Login: true });
}

async function handleSignup(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User with this email already exists" });
  }

  let createdUser = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  const token = await setUser(createdUser);

  res.cookie("uid", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    sameSite: "None",
    path: "/",
  });

  return res.status(200).json({ Login: true });
}

async function handleLogOut(req, res) {
  res.clearCookie("uid");
  return res.status(200).json({ Login: false });
}
async function handleEditUserData(req, res) {
  let userID = req.id;
  let newData = req.body;

  let imageKey;
  let currentUser = await User.findOne({ _id: userID });
  if (!currentUser || !currentUser.imageKey) {
    imageKey = randomUID(req.file.originalname + Date.now()); // Assuming randomUID is a correct function
  } else {
    imageKey = currentUser.imageKey;
  }

  try {
    if (req.file) {
      const putObjParams = {
        Bucket: bucketName,
        Key: imageKey,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(putObjParams);
      await client.send(command);
    }

    const user = await User.findOneAndUpdate(
      { _id: userID },
      { ...newData, imageKey },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User data updated successfully", user });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update user data" });
  }
}

async function handleGetUserData(req, res) {
  try {
    let isLoggedIn = req.isLoggedIn;
    if (!isLoggedIn) {
      return res.status(401).json({ error: "User is not logged in" });
    }

    let id = req.id;
    let dataToSend = await User.find({ _id: id });
    if (!dataToSend || dataToSend.length === 0) {
      return res.status(404).json({ error: "User data not found" });
    }

    let data = dataToSend[0]; // Assuming dataToSend contains only one user's data
    let getDataParam = {
      Bucket: bucketName, // Assuming bucketName is defined
      Key: data.imageKey,
    };
    let command = new GetObjectCommand(getDataParam);
    let url = await getSignedUrl(client, command, { expiresIn: 3600 });

    let userData = { ...data.toObject(), url }; // Convert Mongoose document to plain object

    return res.status(200).json({ isLoggedIn, data: userData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleLogin,
  handleSignup,
  handleLogOut,
  handleEditUserData,
  handleGetUserData,
};

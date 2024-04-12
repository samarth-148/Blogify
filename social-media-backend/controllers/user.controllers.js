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
  const { firstName, lastName, email, password, userName, about } = req.body;
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
    userName,
    about,
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
  res.clearCookie("uid", {
    path: "/",
    secure: true, // Clearing a secure cookie requires the secure flag
    sameSite: "None", // Matches the sameSite setting used when setting the cookie
  });
  return res.status(200).json({ Login: false });
}

async function handleEditUserData(req, res) {
  let userID = req.id;
  let newData = req.body;
  let imageKey = "";
  let currentUser = await User.findOne({ _id: userID });
  if (!currentUser.imageKey) {
    if (req.file) {
      imageKey = randomUID(req.file.originalname + Date.now());
    }
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
    let userprofileUrl =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"; // Default profile image URL

    let data = dataToSend[0]; // Assuming dataToSend contains only one user's data
    if (data.imageKey) {
      let getDataParam = {
        Bucket: bucketName, // Assuming bucketName is defined
        Key: data.imageKey,
      };
      let command = new GetObjectCommand(getDataParam);
      userprofileUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    }

    let userData = { ...data.toObject(), url: userprofileUrl }; // Convert Mongoose document to plain object

    return res.status(200).json({ isLoggedIn, data: userData });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function isUserNameAvailable(req, res) {
  const username = req.body.username;
  try {
    const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
      res.json({ available: false, message: "Username is already taken" });
    } else {
      res.json({ available: true, message: "Username is available" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error checking username availability",
      error: error.message,
    });
  }
}
async function getUsers(req, res) {
  try {
    let users = await User.find({});
    let dataOfusers = await Promise.all(
      users.map(async (user) => {
        let url =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
        if (user.imageKey) {
          let getDataParam = {
            Bucket: bucketName, // Assuming bucketName is defined
            Key: user.imageKey, // Use user.imageKey instead of data.imageKey
          };
          let command = new GetObjectCommand(getDataParam);
          url = await getSignedUrl(client, command, { expiresIn: 3600 });
        }
        return {
          userId: user._id,
          fName: user.firstName,
          lName: user.lastName,
          uName: user.userName,
          url: url,
          about: user.about,
        };
      })
    );
    res.json(dataOfusers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
}

module.exports = {
  handleLogin,
  handleSignup,
  handleLogOut,
  handleEditUserData,
  handleGetUserData,
  isUserNameAvailable,
  getUsers,
};

/** @format */
const path = require("path");
const data = require("../models/data.models");

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

  dataToSend = dataToSend.filter((post) => {
    let isAuthorContains = keywords.some((keyword) =>
      post.author.includes(keyword)
    );
    let isDescriptionCntains = keywords.some((keyword) =>
      post.description.includes(keyword)
    );
    return isAuthorContains || isDescriptionCntains;
  });

  res.status(200).json({ isLoggedIn, data: dataToSend });
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

  res.status(200).json({ isLoggedIn, data: dataToSend });
}

async function handlePostDataReq(req, res) {
  let newData = req.body;
  let postPath = req.file?.path;
  let id = req.id;

  let result = await data.create({
    author: newData.author,
    description: newData.description,
    postType: newData.postType,
    createdBy: id,
    path: postPath,
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
  const shouldBeDeleted = await data.findOne({ _id: id, createdBy: userId });
  if (shouldBeDeleted) {
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

/** @format */
const express = require("express");
const router = express.Router();
const upload = require("../service/uploads");
const {
  handleGetDataReq,
  handlePostDataReq,
  handlePatchDataReq,
  handleDeleteDataReq,
  handleSearchData,
} = require("../controllers/data.controllers");
const { validatePost } = require("../middlewares/dataparser.middlewares");
const {
  checkUserAuthorized,
  isUserLoggedIn,
} = require("../middlewares/auth.middlewares");

router
  .route("/")
  .get(isUserLoggedIn, handleGetDataReq)
  .post(
    checkUserAuthorized,
    upload.single("image"),
    validatePost,
    handlePostDataReq
  );

router
  .route("/:id")
  .patch(checkUserAuthorized, handlePatchDataReq)
  .delete(checkUserAuthorized, handleDeleteDataReq);

router.route("/searchData").post(isUserLoggedIn, handleSearchData);

module.exports = router;

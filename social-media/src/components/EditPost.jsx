/** @format */

import { useContext, useState } from "react";
import { PostListContext } from "../store/post_list_store";
import { Form, Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import "../posts.css";

const EditPost = () => {
  const navigate = useNavigate();
  const { onEditPost, dataToEdit } = useContext(PostListContext);
  let [author, setAuthor] = useState(dataToEdit.author);
  let [description, setDescription] = useState(dataToEdit.description);
  const [isPublic, setIsPublic] = useState(false);

  function handleEditPost() {
    let id = dataToEdit._id;
    let data = {
      author: author,
      description: description,
      postType: isPublic ? "public" : "private",
    };
    onEditPost(id, data, navigate);
  }
  return (
    <>
      {dataToEdit._id != undefined ? (
        <div
          className="mt-5 create-post-container"
          style={{
            width: "50%",
            marginLeft: "25%",
            backgroundColor: "#e9f5f9",
          }}
        >
          <div
            className="card post-style post-container"
            style={{ width: "17rem", marginLeft: "40%" }}
          >
            <img
              src={dataToEdit.url}
              className="card-img-top img-box"
              alt="..."
            />
            <div className="form-container">
              <Form>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Author
                  </label>
                  <input
                    name="author"
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    name="description"
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <div className=" my-3 form-check">
                    <label
                      className="form-check-label"
                      htmlFor="isPublicCheckbox"
                    >
                      Public
                    </label>
                    <input
                      name="postType"
                      type="checkbox"
                      className="form-check-input"
                      id="isPublicCheckbox"
                      checked={isPublic}
                      onChange={() => setIsPublic(!isPublic)}
                    />
                  </div>
                </div>

                <div className="btn-container">
                  <Link
                    to="/"
                    className="btn btn-primary btn-Class"
                    onClick={() => {
                      handleEditPost();
                    }}
                  >
                    Submit
                  </Link>
                  <Link
                    to="/"
                    className="btn btn-primary"
                    onClick={() => {
                      console.log("canceled");
                    }}
                  >
                    Cancel
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LoadingSpinner />
          <div className="signup-link my-5">
            <span>Nothing to edit, Go to</span> <a href="/">Home</a>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;

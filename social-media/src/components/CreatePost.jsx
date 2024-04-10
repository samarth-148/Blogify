/** @format */

import React, { useContext, useState } from "react";
import "../posts.css";
import { useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_store";

const CreatePost = () => {
  const navigate = useNavigate();
  const { onAddPost } = useContext(PostListContext);
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  function handleAddPost(event) {
    event.preventDefault();

    const limitedDescription = description.substring(0, 100);

    const formData = new FormData();
    formData.append("description", limitedDescription);
    formData.append("postType", isPublic ? "public" : "private");
    formData.append("image", file);

    onAddPost(formData, navigate);
  }

  return (
    <div
      className="mt-5 create-post-container"
      style={{ width: "50%", marginLeft: "25%", backgroundColor: "#e9f5f9" }}
    >
      <form onSubmit={handleAddPost} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="isPublicCheckbox">
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
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            File
          </label>
          <input
            id="file"
            accept="image/*"
            name="file"
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

/** @format */

import React, { useContext, useState } from "react";
import "../posts.css";
import { useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_store";

const EditProfile = () => {
  const navigate = useNavigate();
  const {} = useContext(PostListContext);
  const [about, setAbout] = useState("");
  const [file, setFile] = useState(null);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");

  function handleAddPost(event) {
    event.preventDefault();

    const limitedAuthor = author.substring(0, 25);

    const formData = new FormData();
    formData.append("author", limitedAuthor);
    formData.append("firstName", fName);
    formData.append("lastName", lName);
    formData.append("email", email);
    formData.append("image", file);

    // onAddPost(formData, navigate);
  }

  return (
    <div
      className="mt-5 create-post-container"
      style={{ width: "50%", marginLeft: "25%", backgroundColor: "#e9f5f9" }}
    >
      <form onSubmit={handleAddPost} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="fName" className="form-label">
            First Name
          </label>
          <input
            name="fName"
            type="text"
            className="form-control"
            id="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lName" className="form-label">
            Last Name
          </label>
          <input
            name="lName"
            type="text"
            className="form-control"
            id="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About
          </label>
          <input
            name="about"
            type="text"
            className="form-control"
            id="author"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Profile Image
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

export default EditProfile;

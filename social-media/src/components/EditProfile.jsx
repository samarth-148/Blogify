/** @format */

import React, { useContext, useState } from "react";
import "../posts.css";
import { useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_store";

const EditProfile = () => {
  const navigate = useNavigate();
  const { handleEditUserData, userData } = useContext(PostListContext);
  const [about, setAbout] = useState(userData.about);
  const [file, setFile] = useState(null);
  const [fName, setFName] = useState(userData.firstName);
  const [lName, setLName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [userName, setUsername] = useState(userData.userName);

  function handleEdit(event) {
    event.preventDefault();
    let limitedAbout = about;
    if (about.length > 100) {
      limitedAbout = about.substring(0, 100);
    }
    const formData = new FormData();
    formData.append("about", limitedAbout);
    formData.append("firstName", fName);
    formData.append("userName", userName);
    formData.append("lastName", lName);
    formData.append("email", email);
    formData.append("image", file);
    handleEditUserData(formData, navigate);
  }
  return (
    <div
      className="mt-5 create-post-container"
      style={{ width: "50%", marginLeft: "25%", backgroundColor: "#e9f5f9" }}
    >
      <form onSubmit={handleEdit} encType="multipart/form-data">
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
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
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

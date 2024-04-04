/** @format */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import DisplayPosts from "./DisplayPosts";
import { useContext } from "react";
import { PostListContext } from "../store/post_list_store";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const { userData } = useContext(PostListContext);

  return (
    <div
      className="mt-5 "
      style={{ width: "50%", marginLeft: "25%", backgroundColor: "#e9f5f9" }}
    >
      <Container className="">
        <Row className="justify-content-md-left w-100">
          <Col className="d-flex flex-column m-5">
            <Row className="mb-4">
              <Col xs={4} md={4} className="mr-10">
                <img
                  src="https://via.placeholder.com/250"
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              </Col>
              <Col xs={8} md={8} className="d-flex flex-column ">
                <div className="d-flex flex-row justify-content-around mt-3 ml-5">
                  <h3>User Name</h3>
                  <Link
                    to="/edit"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <IoSettingsSharp style={{ fontSize: "25px" }} />
                  </Link>
                </div>
                <div className="d-flex flex-row justify-content-around mt-3">
                  <span>5 posts</span>
                  <span>Followers</span>
                  <span>Following</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Blogs Area</h3>
                <p>This is a sample blog post.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <hr style={{ color: "gray", height: "2px", margin: "20px 0" }} />
      <div className="mb-5 py-5">
        {userData.length !== 0 ? (
          <DisplayPosts data={userData} />
        ) : (
          <div className="text-center">
            <div
              style={{
                height: "100px",
                width: "100px",
                border: "3px solid #000",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 20px",
              }}
            >
              <FaCamera style={{ fontSize: "50px" }} />
            </div>
            <h2>Share Photos</h2>
            <p>When you share photos, they will appear on your profile.</p>
            <Link to="/create-post" style={{ textDecoration: "none" }}>
              Share your first photo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

/** @format */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import DisplayPosts from "./DisplayPosts";
import { FaCamera } from "react-icons/fa";

const Profile = ({ userData, userPosts }) => {
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
                  src={userData.url}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              </Col>
              <Col xs={8} md={8} className="d-flex flex-column ">
                <div className="d-flex flex-row justify-content-evenly mt-3 px-4">
                  <h3 className="">{userData.userName}</h3>
                  <Link
                    to="/edit"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <IoSettingsSharp
                      style={{ fontSize: "25px" }}
                      className=""
                    />
                  </Link>
                </div>
                <div className="d-flex flex-row justify-content-evenly mt-3 px-5">
                  <span className="">{userPosts.length + " " + "posts"}</span>
                  <span>0 Followers</span>
                  <span>0 Following</span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>{userData.firstName + " " + userData.lastName}</h3>
                <p>{userData.about}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <hr style={{ color: "gray", height: "2px" }} />
      <div className="mb-5 ">
        {userPosts.length !== 0 ? (
          <DisplayPosts data={userPosts} isHome={false} />
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

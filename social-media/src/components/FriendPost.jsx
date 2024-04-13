/** @format */

import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_store";

const FriendPost = ({ userData }) => {
  const { handleOpenedProfileData } = useContext(PostListContext);
  const Navigate = useNavigate();
  function handler(data) {
    handleOpenedProfileData(data);
  }
  return (
    <>
      <Container className="my-3">
        <Row className="">
          <Col xs={2}>
            <img
              className="mx-5"
              src={userData.url}
              alt="Profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              onClick={(e) => {
                handler(userData);
                Navigate("/openUserProfile");
              }}
            />
          </Col>
          <Col
            xs={6}
            className="d-flex flex-column justify-content-between mx-3"
          >
            <span
              onClick={(e) => {
                handler(userData);
                Navigate("/openUserProfile");
              }}
            >
              <strong style={{ color: "black" }}>{userData.userName}</strong>
            </span>
            <span className="text-muted">
              {userData.firstName + " " + userData.lastName}
            </span>
          </Col>
          <Col xs={3} className="d-flex align-items-center justify-content-end">
            <Button variant="primary">Follow</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FriendPost;

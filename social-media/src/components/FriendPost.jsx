/** @format */

import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const FriendPost = ({ userData }) => {
  return (
    <>
      <Container className="my-3">
        <Row className="">
          <Col xs={2}>
            <img
              className="mx-5"
              src={userData.imageUrl}
              alt="Profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          </Col>
          <Col
            xs={6}
            className="d-flex flex-column justify-content-between mx-3"
          >
            <span>
              <strong>{userData.username}</strong>
            </span>
            <span className="text-muted">{userData.fullName}</span>
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

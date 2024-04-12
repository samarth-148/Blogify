/** @format */

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FriendPost = ({ userData }) => {
  return (
    <>
      <Container className="my-3">
        <Row className="">
          <Col xs={2}>
            <Link>
              <img
                className="mx-5"
                src={userData.url}
                alt="Profile"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </Link>
          </Col>
          <Col
            xs={6}
            className="d-flex flex-column justify-content-between mx-3"
          >
            <span>
              <Link style={{ textDecoration: "none" }}>
                <strong style={{ color: "black" }}>{userData.uName}</strong>
              </Link>
            </span>
            <span className="text-muted">
              {userData.fName + " " + userData.lName}
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

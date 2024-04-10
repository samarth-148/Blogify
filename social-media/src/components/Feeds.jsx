/** @format */

import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";

const Feeds = ({ data }) => {
  const [sortBy, setSortBy] = useState("recent");

  const handleSortChange = (eventKey) => {
    setSortBy(eventKey);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  function formatTime(timestamp) {
    const currentDate = new Date();
    const createdAtDate = new Date(timestamp);
    const diffInMilliseconds = currentDate - createdAtDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInYears > 0) {
      return diffInYears + "y";
    } else if (diffInMonths > 0) {
      return diffInMonths + "m";
    } else {
      if (diffInDays == 0) {
        return "Today";
      } else {
        return diffInDays + "d";
      }
    }
  }
  sortedData.forEach((post) => {
    post.time = formatTime(post.createdAt);
  });

  return (
    <Container className="mt-5">
      <Row className="d-flex flex-column align-content-center">
        <Col
          sm={6}
          md={4}
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Dropdown onSelect={handleSortChange}>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundColor: "white",
                border: "none",
                color: "black",
              }}
            >
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="recent">Recent</Dropdown.Item>
              <Dropdown.Item eventKey="old">Old</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="d-flex flex-column align-content-center">
        {sortedData.map((post) => (
          <Col key={post._id} sm={6} md={4} className="mb-4">
            <Card>
              <Row className="p-2 align-items-center d-flex flex-row">
                <Col xs={1} className="mx-1">
                  <img
                    src={post.profileUrl}
                    alt="User"
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                    }}
                  />
                </Col>
                <Col xs={8} className="mx-2">
                  <span className="mr-3" style={{ fontSize: "14px" }}>
                    {/* <strong>{post.username}</strong> */}
                    <strong>samarth.148</strong>
                  </span>
                  <span style={{ fontSize: "14px" }}>
                    <strong>
                      <BsDot />
                    </strong>
                  </span>
                  <span style={{ fontSize: "14px", color: "#787777" }}>
                    {post.time}
                  </span>
                </Col>
              </Row>
              <Card.Img
                variant="top"
                src={post.url}
                style={{ borderRadius: "0px" }}
              />
              <Card.Body>
                <Card.Text>{post.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Feeds;

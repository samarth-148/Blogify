/** @format */

import React, { useContext, useState } from "react";
import { Card, Container, Row, Col, Dropdown } from "react-bootstrap";
import { BsDot } from "react-icons/bs";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { PostListContext } from "../store/post_list_store";
import { useNavigate } from "react-router-dom";

const Feeds = ({ data, isHome }) => {
  const [sortBy, setSortBy] = useState("recent");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { onDeletePost, handleDataObjToEdit } = useContext(PostListContext);
  const navigate = useNavigate();

  const handleSortChange = (eventKey) => {
    setSortBy(eventKey);
  };

  const handleDropdownToggle = (postId) => {
    setShowDropdown(!showDropdown);
    setSelectedPost(postId);
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
      if (diffInDays === 0) {
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
      <Row className="d-flex flex-column align-content-center ">
        {sortedData.map((post) => (
          <Col key={post._id} sm={6} md={4} className="mb-4">
            <Card>
              <Row className="p-2  d-flex justify-content-between px-3  ">
                <div className="d-flex flex-row px-2 w-75">
                  <Col xs={3} className="mx-1">
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
                  <Col xs={5} className="mx-2 d-flex flex-row pt-2">
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
                </div>
                {!isHome ? (
                  <>
                    <Col xs={1} className="mx-2 pt-1">
                      <PiDotsThreeVerticalBold
                        onClick={() => handleDropdownToggle(post._id)}
                      />
                      {showDropdown && selectedPost === post._id && (
                        <div
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                            zIndex: 9999,
                          }}
                        >
                          <Dropdown.Menu show>
                            <Dropdown.Item
                              onClick={(e) => {
                                handleDataObjToEdit(post);
                                navigate("/edit-post");
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                onDeletePost(post._id);
                              }}
                            >
                              Remove
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </div>
                      )}
                    </Col>
                  </>
                ) : (
                  <></>
                )}
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

/** @format */

import React, { useContext, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner";
import { PostListContext } from "../store/post_list_store";
import NotFound from "./NotFound";

const DisplayPosts = () => {
  const { searchedData } = useContext(PostListContext);
  const [sortBy, setSortBy] = useState("recent");
  console.log(searchedData);

  const handleSortChange = (eventKey) => {
    setSortBy(eventKey);
  };

  const sortedData = [...searchedData].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <>
      {searchedData === null ? (
        <LoadingSpinner />
      ) : searchedData.length > 0 ? (
        <div
          className="mt-5 pt-5 display-posts-container"
          style={{
            width: "50%",
            marginLeft: "25%",
            backgroundColor: "#e9f5f9",
          }}
        >
          <div
            style={{ width: "100%" }}
            className="d-flex  justify-content-between"
          >
            <strong className="mx-5 px-4 mb-3 ">Top posts</strong>
            <Dropdown onSelect={handleSortChange} className="mx-5 px-4 mb-3">
              <Dropdown.Toggle id="dropdown-basic">Filter</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="recent">Recent</Dropdown.Item>
                <Dropdown.Item eventKey="old">Old</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {sortedData.map((item, index) => (
            <Post isHome={true} item={item} key={item._id} index={index} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default DisplayPosts;

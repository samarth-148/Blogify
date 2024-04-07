/** @format */

import DisplayPosts from "./DisplayPosts";
import { useContext } from "react";
import { PostListContext } from "../store/post_list_store";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";

const Home = () => {
  const { data } = useContext(PostListContext);
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

  return (
    <div
      className="mt-5 pt-5 "
      style={{ width: "50%", marginLeft: "25%", backgroundColor: "#e9f5f9" }}
    >
      <div style={{ width: "100%", paddingLeft: "10px" }}>
        <Dropdown onSelect={handleSortChange} className="mx-5 px-4 mb-3">
          <Dropdown.Toggle id="dropdown-basic">Filter</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="recent">Recent</Dropdown.Item>
            <Dropdown.Item eventKey="old">Old</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <DisplayPosts isHome={true} data={sortedData} />
    </div>
  );
};

export default Home;

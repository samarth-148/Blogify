/** @format */

import React from "react";
import FriendPost from "./FriendPost";

const Friends = () => {
  // Dummy data
  const userData = {
    username: "john_doe",
    fullName: "John Doe",
    imageUrl:
      "https://images.pexels.com/photos/16039120/pexels-photo-16039120/free-photo-of-sunlit-rocks-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  };

  return (
    <div
      className="mt-5 p-5 "
      style={{
        width: "40%",
        marginLeft: "25%",
        backgroundColor: "#e9f5f9",
        marginLeft: "30%",
      }}
    >
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
      <FriendPost userData={userData} />
    </div>
  );
};

export default Friends;

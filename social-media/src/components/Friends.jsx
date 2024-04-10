/** @format */

import React, { useContext, useEffect } from "react";
import FriendPost from "./FriendPost";
import { PostListContext } from "../store/post_list_store";

const Friends = () => {
  const { getAllUsers, allUsersData, userData } = useContext(PostListContext);
  // Dummy data
  useEffect(() => {
    getAllUsers();
  }, []);

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
      {allUsersData.map((user) => {
        if (user.userId != userData._id) return <FriendPost userData={user} />;
      })}
    </div>
  );
};

export default Friends;

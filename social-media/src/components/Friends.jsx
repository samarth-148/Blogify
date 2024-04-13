/** @format */

import React, { useContext, useEffect } from "react";
import FriendPost from "./FriendPost";
import { PostListContext } from "../store/post_list_store";

const Friends = () => {
  const { getAllUsers, allUsersData, userData } = useContext(PostListContext);
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div
      className="mt-5 p-5 "
      style={{
        width: "40%",
        backgroundColor: "#e9f5f9",
        marginLeft: "30%",
      }}
    >
      {allUsersData.map((user) => {
        if (user._id != userData._id)
          return <FriendPost userData={user} key={user._id} />;
      })}
    </div>
  );
};

export default Friends;

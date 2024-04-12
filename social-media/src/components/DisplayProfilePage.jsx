/** @format */

import React, { useEffect } from "react";
import { PostListContext } from "../store/post_list_store";
import { useContext } from "react";
import Profile from "./Profile";

const DisplayProfilePage = () => {
  const { userData, userPosts, handleGetData, getUserData } =
    useContext(PostListContext);
  useEffect(() => {
    getUserData();
    handleGetData();
  }, []);
  return (
    <>
      <Profile userData={userData} userPosts={userPosts} />
    </>
  );
};

export default DisplayProfilePage;

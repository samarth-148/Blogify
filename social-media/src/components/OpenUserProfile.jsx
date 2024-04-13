/** @format */

import React, { useContext } from "react";
import Profile from "./Profile";
import { PostListContext } from "../store/post_list_store";

const OpenUserProfile = () => {
  const { opendUserData } = useContext(PostListContext);
  return <Profile userData={opendUserData} userPosts={[]} />;
};

export default OpenUserProfile;

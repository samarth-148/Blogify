/** @format */

import DisplayPosts from "./DisplayPosts";
import { PostListContext } from "../store/post_list_store";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useContext, useEffect } from "react";
import Feeds from "./Feeds";

const Home = () => {
  const { data, isLoaded, handleGetData } = useContext(PostListContext);

  useEffect(() => {
    handleGetData();
  }, [isLoaded]);

  return <Feeds data={data} isHome={true} />;
};

export default Home;

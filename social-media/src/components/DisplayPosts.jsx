/** @format */
import "../posts.css";
import LoadingSpinner from "./LoadingSpinner";
import { useContext, useEffect } from "react";
import { PostListContext } from "../store/post_list_store";
import Feeds from "./Feeds";

const DisplayPosts = ({ isHome, data }) => {
  const { isLoaded, handleGetData } = useContext(PostListContext);
  useEffect(() => {
    handleGetData();
  }, [isLoaded]);

  return (
    <>
      {data && data.length > 0 ? (
        <Feeds data={data} isHome={isHome} />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default DisplayPosts;

/** @format */

import React, { useContext } from "react";
import Post from "./Post";
import LoadingSpinner from "./LoadingSpinner";
import { PostListContext } from "../store/post_list_store";
import NotFound from "./NotFound";

const DisplayPosts = () => {
  const { searchedData } = useContext(PostListContext);

  return (
    <>
      {searchedData === null ? (
        <LoadingSpinner />
      ) : searchedData.length > 0 ? (
        <div className="display-posts-container">
          {searchedData.map((item, index) => (
            <Post item={item} key={item._id} index={index} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default DisplayPosts;

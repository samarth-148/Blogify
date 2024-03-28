/** @format */
import Post from "./Post";
import "../posts.css";
import LoadingSpinner from "./LoadingSpinner";
import { useContext, useEffect } from "react";
import { PostListContext } from "../store/post_list_store";

const DisplayPosts = ({}) => {
  const { data, isLoaded, handleGetData } = useContext(PostListContext);

  useEffect(() => {
    handleGetData();
  }, [isLoaded]);

  return (
    <>
      {data && data.length > 0 ? (
        <div className="display-posts-container">
          {data.map((item, index) => (
            <Post item={item} key={item._id} index={index} />
          ))}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default DisplayPosts;

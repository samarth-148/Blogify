/** @format */
import Post from "./Post";
import "../posts.css";
import LoadingSpinner from "./LoadingSpinner";
import { useContext, useEffect } from "react";
import { PostListContext } from "../store/post_list_store";

const DisplayPosts = ({}) => {
  const { data, setPostsData, isLoaded, setUserLoggedIn } =
    useContext(PostListContext);

  useEffect(() => {
    let url = "http://localhost:4400/api/data";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("Unauthorized. Redirecting to login page.");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        setPostsData(res.data);
        setUserLoggedIn(res.isLoggedIn);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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

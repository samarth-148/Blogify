/** @format */

import DisplayPosts from "./DisplayPosts";
import { useContext } from "react";
import { PostListContext } from "../store/post_list_store";

const Home = () => {
  const { data } = useContext(PostListContext);
  return (
    <div
      className="mt-5 pt-5 "
      style={{ width: "50%", marginLeft: "25%", backgroundColor: "#e9f5f9" }}
    >
      <DisplayPosts isHome={true} data={data} />
    </div>
  );
};

export default Home;

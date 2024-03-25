/** @format */
//Post.jsx
import { useContext } from "react";
import "../posts.css";
import { PostListContext } from "../store/post_list_store";
import { Link } from "react-router-dom";

const Post = ({ item }) => {
  const { onDeletePost, handleDataObjToEdit } = useContext(PostListContext);
  return (
    <div className="card post-style post-container" style={{ width: "17rem" }}>
      <img src={item.url} className="card-img-top img-box" alt="..." />
      <div className="card-body ">
        <div>
          <h5 className="card-author">{item.author}</h5>
          <p className="card-text">{item.description}</p>
        </div>
        <div className="btn-container">
          <button
            className="button-submit"
            onClick={() => onDeletePost(item._id)}
          >
            Remove
          </button>
          <Link
            to="/edit-post"
            className="button-submit"
            onClick={() => {
              handleDataObjToEdit(item);
            }}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;

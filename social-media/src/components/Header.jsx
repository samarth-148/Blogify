/** @format */
//Header.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_store";

const Header = () => {
  const { isLoggedIn, handleLogOut, handleSearch } =
    useContext(PostListContext);
  const [searchStr, setSearch] = useState("");
  const navigate = useNavigate();

  function handleLoggedOut() {
    handleLogOut(navigate);
  }

  function handleSearchData(event) {
    event.preventDefault();

    if (!searchStr) {
      return;
    }
    const dataArray = searchStr.split(/[,\s]+/);
    handleSearch(dataArray, navigate);
  }
  return (
    <div className="d-flex align-items-center p-3  text-white bg-purple  shadow-sm">
      <img
        className="me-3"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png"
        alt=""
        width="48"
        height="38"
      />
      <div className="lh-1 me-3">
        <h1 className="h6 mb-0 text-white lh-1">Blogify</h1>
        <small>Since 2011</small>
      </div>

      <Link
        to="/"
        className="h6 mb-0 px-2 text-white lh-1 text-decoration-none"
      >
        Home
      </Link>
      <Link
        to="/create-post"
        className=" h6  mb-0  px-2 text-white  text-decoration-none btn-lg width-set"
      >
        Add Post
      </Link>
      <Link
        to="https://samarthpatel148.netlify.app/"
        className="h6 mb-0 px-2 text-white lh-1 text-decoration-none"
      >
        About
      </Link>
      <div className="d-flex w-100 justify-content-end ">
        <form
          className="d-flex flex-row justify-content-between me-5"
          role="search"
          onSubmit={handleSearchData}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="btn btn-outline-light me-2" type="submit">
            Search
          </button>
        </form>
        <div className="">
          {isLoggedIn ? (
            <>
              <Link
                type="button"
                className="btn btn-outline-light me-2"
                onClick={(e) => {
                  handleLoggedOut();
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                type="button"
                className="btn btn-outline-light me-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                type="button"
                className="btn btn-outline-light me-2"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

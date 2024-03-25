/** @format */
import { createContext, useState } from "react";
import axios from "axios";

export const PostListContext = createContext({
  isLoaded: 0,
  isLoggedIn: 0,
  dataToEdit: {},
  data: [],
  searchedData: [],
  onAddPost: () => {},
  onDeletePost: () => {},
  setdataLoadedOrNot: () => {},
  setPostsData: () => {},
  onEditPost: () => {},
  handleDataObjToEdit: () => {},
  onUserSignUp: () => {},
  onUserLogin: () => {},
  handleLogOut: () => {},
  setUserLoggedIn: () => {},
  hadleSearch: () => {},
  setSearchedPostdata: () => {},
});

const PostListprovider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState({});

  function setPostsData(fetcheData) {
    setData(fetcheData);
  }
  function setSearchedPostdata(data) {
    setSearchedData(data);
  }
  function handleDataObjToEdit(editObjData) {
    setDataToEdit(editObjData);
  }
  async function handleSearch(arr, navigate) {
    try {
      const requestDataObj = { data: arr };
      const url = "http://localhost:4400/api/data/searchData";

      const response = await axios.post(url, requestDataObj, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173/",
        },
        withCredentials: true,
      });

      const data = response.data;
      setTimeout(() => {
        setSearchedPostdata(data.data);
        setUserLoggedIn(data.isLoggedIn);
      }, 3000);

      navigate("/search");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Redirecting to login page.");
        navigate("/");
      } else {
        alert(`Error fetching data: ${error.message}`);
      }
    }
  }

  async function onAddPost(formData, navigate) {
    try {
      const response = await axios.post(
        "http://localhost:4400/api/data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "http://localhost:5173/",
          },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to add this post");
      } else {
        alert("An error occurred while adding the post");
      }
    }
  }

  function setdataLoadedOrNot() {
    setLoaded(isLoaded + 1);
  }
  function setUserLoggedIn(response) {
    setLoggedIn(response);
  }

  async function onDeletePost(id) {
    try {
      let url = `http://localhost:4400/api/data/${id}`;
      const response = await axios.delete(url, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Post deleted successfully");
      setdataLoadedOrNot();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to delete this post");
      } else {
        alert("An error occurred while deleting the post");
      }
    }
  }
  async function onEditPost(id, data, navigate) {
    try {
      let url = `http://localhost:4400/api/data/${id}`;
      const response = await axios.patch(url, data, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("Post updated successfully");
      setdataLoadedOrNot();
      setLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Error updating post: " + error.message);
    }
  }

  async function onUserSignUp(data, navigate) {
    try {
      let url = `http://localhost:4400/api/user/signup`;
      const response = await axios.post(url, data, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      alert("Signed up successfully");
      setLoggedIn(true);
      setdataLoadedOrNot();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User with this email already exists");
        navigate("/login");
      } else if (error.response && error.response.status === 400) {
        alert("Please fill in all required fields properly");
      } else {
        alert("Error signing up: " + error.message);
      }
    }
  }

  async function onUserLogin(data, navigate) {
    try {
      let url = `http://localhost:4400/api/user/login`;
      const response = await axios.post(url, data, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      alert("Logged in successfully");
      setLoggedIn(true);
      setdataLoadedOrNot();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Enter correct credentials");
      } else {
        alert("Error logging in");
      }
    }
  }
  async function handleLogOut(navigate) {
    try {
      let url = `http://localhost:4400/api/user/logout`;
      await axios.get(url, {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173/",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      alert("Logged out successfully");
      setLoggedIn(false);
      setdataLoadedOrNot();
      navigate("/");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  }

  return (
    <PostListContext.Provider
      value={{
        isLoaded,
        data,
        onAddPost,
        onDeletePost,
        setPostsData,
        onEditPost,
        handleLogOut,
        handleDataObjToEdit,
        dataToEdit,
        onUserLogin,
        onUserSignUp,
        isLoggedIn,
        setUserLoggedIn,
        handleSearch,
        searchedData,
        setSearchedPostdata,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};
export default PostListprovider;

/** @format */
import { createContext, useState } from "react";
import axios from "axios";

export const PostListContext = createContext({
  isLoaded: 0,
  isLoggedIn: 0,
  dataToEdit: {},
  data: [],
  userData: {},
  userPosts: [],
  searchedData: [],
  onAddPost: () => {},
  onDeletePost: () => {},
  setdataLoadedOrNot: () => {},
  setPostsData: () => {},
  onEditPost: () => {},
  handleDataObjToEdit: () => {},
  handleGetData: () => {},
  onUserSignUp: () => {},
  onUserLogin: () => {},
  handleLogOut: () => {},
  setUserLoggedIn: () => {},
  hadleSearch: () => {},
  setSearchedPostdata: () => {},
  handlePostsByUser: () => {},
  handleEditUserData: () => {},
  getUserData: () => {},
});

const PostListprovider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [searchedData, setSearchedData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState({});
  const backend_url = "https://blogify-vp1v.onrender.com";
  // const backend_url = "http://localhost:4400";

  function setPostsData(fetcheData) {
    setData(fetcheData);
  }
  function setSearchedPostdata(data) {
    setSearchedData(data);
  }
  function setUserPostData(data) {
    setUserPosts(data);
  }
  function handleDataObjToEdit(editObjData) {
    setDataToEdit(editObjData);
  }

  async function handleGetData() {
    let url = backend_url + "/api/data";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Unauthorized. Redirecting to login page.");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        const userPosts = res.data.filter(
          (data) => data.createdBy === res.userId
        );
        console.log(res.data);
        setUserPostData(userPosts);
        setPostsData(res.data);
        setUserLoggedIn(res.isLoggedIn);
      })
      .catch((error) => {
        alert("Error fetching data");
      });
  }

  async function handleSearch(arr, navigate) {
    try {
      const requestDataObj = { data: arr };
      const url = backend_url + "/api/data/searchData";

      const response = await axios.post(url, requestDataObj, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const data = response.data;
      setTimeout(() => {
        setSearchedPostdata(data.data);
        setUserLoggedIn(data.isLoggedIn);
      }, 300);

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
  async function handleEditUserData(formData, navigate) {
    const url = backend_url + "/api/user/editUserData";
    try {
      const response = await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.msg);
      } else {
        alert("An error occurred while adding the post");
      }
    }
  }

  async function onAddPost(formData, navigate) {
    const url = backend_url + "/api/data";
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.msg);
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
  function setUserDetails(data) {
    setUserData(data);
  }

  async function onDeletePost(id) {
    try {
      let url = backend_url + `/api/data/${id}`;
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
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
      let url = backend_url + `/api/data/${id}`;
      const response = await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("Post updated successfully");
      setdataLoadedOrNot();
      setLoggedIn(true);
      navigate("/");
      console.log(response);
    } catch (error) {
      alert("Error updating post: " + error.message);
    }
  }

  async function onUserSignUp(data, navigate) {
    try {
      let url = backend_url + "/api/user/signup";
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
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
      let url = backend_url + "/api/user/login";
      const response = await axios.post(url, data, {
        headers: {
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
      let url = backend_url + "/api/user/logout";
      await axios.get(url, {
        headers: {
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

  async function getUserData() {
    let url = backend_url + "/api/user/userDetails";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          alert("Unauthorized. Redirecting to login page.");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        setUserDetails(res.data);
        setUserLoggedIn(res.isLoggedIn);
      })
      .catch((error) => {
        alert("Error fetching data");
      });
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
        handleGetData,
        onUserLogin,
        onUserSignUp,
        isLoggedIn,
        setUserLoggedIn,
        handleSearch,
        searchedData,
        setSearchedPostdata,
        userData,
        userPosts,
        handleEditUserData,
        getUserData,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};
export default PostListprovider;

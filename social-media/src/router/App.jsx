/** @format */

// App.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import PostListprovider from "../store/post_list_store";
import { Outlet } from "react-router-dom";

function App() {
  let [selectedOption, setSelectedOption] = useState("Home");

  function onSelect(value) {
    setSelectedOption(value);
  }
  return (
    <PostListprovider>
      <div className="container-app">
        <div className="content">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListprovider>
  );
}

export default App;

/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./router/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/CreatePost.jsx";
import EditPost from "./components/EditPost.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import DisplaySearchItems from "./components/DisplaySearchItems.jsx";
import Home from "./components/Home.jsx";
import EditProfile from "./components/EditProfile.jsx";
import Friends from "./components/Friends.jsx";
import DisplayProfilePage from "./components/DisplayProfilePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/edit-post",
        element: <EditPost />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/search",
        element: <DisplaySearchItems />,
      },
      {
        path: "/DisplayProfile",
        element: <DisplayProfilePage />,
      },
      {
        path: "/edit",
        element: <EditProfile />,
      },
      {
        path: "/friends",
        element: <Friends />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

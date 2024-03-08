/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./router/App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreatePost from "./components/CreatePost.jsx";
import DisplayPosts from "./components/DisplayPosts.jsx";
import EditPost from "./components/EditPost.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import DisplaySearchItems from "./components/DisplaySearchItems.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <DisplayPosts /> },
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

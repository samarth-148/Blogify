/** @format */
import "../posts.css";
import { Form } from "react-router-dom";
import { useContext, useState } from "react";
import { PostListContext } from "../store/post_list_store";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const { onUserLogin } = useContext(PostListContext);
  const navigate = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const loginInfo = Object.fromEntries(formdata);
    onUserLogin(loginInfo, navigate);
    setSubmitted(true);
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />

        <button className="submit-btn-login" type="submit">
          Login
        </button>
        <div className="signup-link">
          <span>Haven't signed up?</span> <a href="/signup">Sign Up</a>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;

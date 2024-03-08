/** @format */
import { Form, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostListContext } from "../store/post_list_store";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { onUserSignUp } = useContext(PostListContext);

  function handleSignUp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const signUpData = Object.fromEntries(formData);
    onUserSignUp(signUpData, navigate);
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Form onSubmit={handleSignUp}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your Last Name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />

        <button className="submit-btn-login" type="submit">
          Sign Up
        </button>
        <div className="signup-link">
          <span>Already signed up?</span> <a href="/login">login</a>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;

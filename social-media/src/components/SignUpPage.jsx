/** @format */
import { Form, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { PostListContext } from "../store/post_list_store";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { onUserSignUp, checkUserName } = useContext(PostListContext);
  const [isUserNameAvailable, setIsUserNameAvailable] = useState(false);

  async function handleSignUp(event) {
    event.preventDefault();
    if (isUserNameAvailable) {
      const formData = new FormData(event.target);
      const signUpData = Object.fromEntries(formData);
      onUserSignUp(signUpData, navigate);
    } else {
      alert("Username not available");
    }
  }

  async function checkIsUserNameAvailable(event) {
    const userName = event.target.value;

    let response = await checkUserName(userName);
    // console.log(response.available);
    setIsUserNameAvailable(response.available);
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
        <label htmlFor="userName">User Name</label>
        <div style={{ display: "flex", alignContent: "center" }}>
          <input
            style={{ width: "100%" }}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter User Name"
            onChange={checkIsUserNameAvailable}
            required
          />
          {isUserNameAvailable ? (
            <span
              className="mt-2 mb-2 p-2"
              style={{ color: "green", marginLeft: "5px" }}
            >
              ✓
            </span>
          ) : (
            <span style={{ color: "red", marginLeft: "5px" }}>✕</span>
          )}
        </div>

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
        <label htmlFor="about">Bio</label>
        <input
          type="text"
          id="about"
          name="about"
          placeholder="Enter your Bio..."
        />

        <button
          className="submit-btn-login"
          type="submit"
          disabled={!isUserNameAvailable}
        >
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

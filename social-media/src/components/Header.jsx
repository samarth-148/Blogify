/** @format */

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostListContext } from "../store/post_list_store";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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
    setSearch(""); // Reset search input after submitting
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid style={{ height: "100px" }} className="mx-3">
        <img className="me-3" src="/logo2.png" alt="" width="75" height="75" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/create-post" className="nav-link">
              Create Post
            </Link>
            <Link to="/friends" className="nav-link">
              Friends
            </Link>
            <Nav.Link href="https://samarthpatel148.netlify.app/">
              About Dev
            </Nav.Link>
            <NavDropdown title="Profile" id="navbarScrollingDropdown">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="dropdown-item">
                    Visit Profile
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={(e) => {
                      handleLoggedOut();
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <Link to="/login" className="dropdown-item">
                    Login
                  </Link>
                  <NavDropdown.Divider />
                  <Link to="/signup" className="dropdown-item">
                    SignUp
                  </Link>
                </>
              )}
            </NavDropdown>
          </Nav>
          <form
            className="d-flex flex-row justify-content-between "
            onSubmit={handleSearchData}
            role="search"
            aria-label="Search"
          >
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={searchStr}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

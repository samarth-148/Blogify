/** @format */
//Header.jsx
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create-post">Create Post</Nav.Link>
            <Nav.Link href="https://samarthpatel148.netlify.app/">
              About Dev
            </Nav.Link>
            <NavDropdown title="Profile" id="navbarScrollingDropdown">
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item href="/profile">
                    Visit Profile
                  </NavDropdown.Item>
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
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
          <form
            className="d-flex flex-row justify-content-between "
            onSubmit={handleSearchData}
          >
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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

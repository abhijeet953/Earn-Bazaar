import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import logoUrl from "../assets/logo.svg";
import Avatar from "react-avatar";
import { LinkContainer } from "react-router-bootstrap";
// import Container from "react-bootstrap/esm/Container";
// import Row from "react-bootstrap/esm/Row";
// import Col from "react-bootstrap/esm/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="sm"
        bg="dark"
        variant="dark"
        className="nav-sm"
        height="30"
      >
        <LinkContainer to="/">
          <Navbar.Brand>
            EarnBazaar
            <img
              alt=""
              src={logoUrl}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto topCenter topList">
            <LinkContainer to="/home">
              <Nav.Link className="topListItem">HOME</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/write">
              <Nav.Link className="topListItem">WRITE</Nav.Link>
            </LinkContainer>
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link className="topListItem">LOGIN</Nav.Link>
              </LinkContainer>
            )}
            {!user && (
              <LinkContainer to="/register">
                <Nav.Link className="topListItem">REGISTER</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          <Nav className="topRight">
            {user && (
              <NavDropdown
                title={
                    "Profile"
                }
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/settings" className="txt-dec">
                    <Avatar
                      className="avatar"
                      color={Avatar.getRandomColor("sitebase")}
                      size="35"
                      name={user.username}
                      round={true}
                    />{" "}
                    {user.username}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  LOGOUT
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

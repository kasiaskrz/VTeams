import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <Navbar
      expand="lg"
      className="vteam-navbar"
      variant="dark"
    >
      <Container>

        <Navbar.Brand as={Link} to="/">
          <img
            src="/src/assets/Logo_white.ver.png"
            alt="VTeams Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">

            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
            <Nav.Link as={Link} to="/add">Add Team</Nav.Link>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

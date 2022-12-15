import React from "react";
import { Container, Navbar } from "react-bootstrap";

function PageNavbar() {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Expense Tracker
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default PageNavbar;

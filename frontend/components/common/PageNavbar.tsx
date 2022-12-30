import React from "react";
import { Container, Navbar } from "react-bootstrap";
import style from "../../styles/Main.module.css";
import { ConnectButton } from "web3uikit";
function PageNavbar() {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Container className="d-flex justify-content-around">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className={`d-inline-block align-top ${style.rotate}`}
            />{" "}
            Expense Tracker
          </Navbar.Brand>
          <ConnectButton moralisAuth={false} />
        </Container>
      </Navbar>
    </>
  );
}

export default PageNavbar;

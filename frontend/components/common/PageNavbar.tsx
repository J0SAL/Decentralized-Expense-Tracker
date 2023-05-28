import React from "react";
import { Container, Navbar } from "react-bootstrap";
import style from "../../styles/Main.module.css";
import { ConnectButton } from "web3uikit";
function PageNavbar() {
  return (
    <>
      <Navbar
        style={{
          backgroundColor: "deeppink",
        }}
        variant="light"
        fixed="top"
      >
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="40"
              height="40"
              className={`d-inline-block align-center ${style.rotate}`}
            />
            <span
              style={{
                marginLeft: "10px",
              }}
            ></span>
            {"  "} Jarvis Expense Tracker
          </Navbar.Brand>
          <ConnectButton moralisAuth={false} />
        </Container>
      </Navbar>
    </>
  );
}

export default PageNavbar;

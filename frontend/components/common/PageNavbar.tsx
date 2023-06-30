import React from "react";
import { Container, Navbar } from "react-bootstrap";
import style from "../../styles/Main.module.css";
import { ConnectButton } from "web3uikit";
function PageNavbar() {
  return (
    <>
      <Navbar bg="light" variant="light" fixed="top">
        <Container className="d-flex justify-content-around media">
          <Navbar.Brand href="#home" style={{fontSize: 16 , position:"relative" , left: 36 , fontWeight:600}}>
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

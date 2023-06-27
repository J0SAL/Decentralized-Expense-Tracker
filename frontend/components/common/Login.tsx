import React from "react";
import { ConnectButton } from "web3uikit";

function Login() {
  return (
    <div>
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src="/images/welcome.svg"
          alt="no data"
          width={"100vh"}
          height={"100vh"}
        />
        <ConnectButton moralisAuth={false} />

        <h1 style={{ fontSize: "15px", width: "60%", marginTop: "60px" }}>
          Please note that this application is currently operating on the Goerli
          ETH testnet network. While support for additional chains is in
          development, it is not available at the moment. Please switch your
          network to Goerli for optimal functionality.
        </h1>
      </div>
    </div>
  );
}

export default Login;

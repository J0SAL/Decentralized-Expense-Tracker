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
      </div>
    </div>
  );
}

export default Login;

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
        Connect to Wallet First
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}

export default Login;

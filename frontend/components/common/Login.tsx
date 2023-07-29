import React, { useState, useEffect } from "react";
import { ConnectButton } from "web3uikit";

function Login() {
  return (
    <div>
      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px"
        }}
      >
        <style>
          {`
          @media (max-width: 600px) {
            div {
              flex-direction: column;
            }
          `}
        </style>
        <img
          src="/images/welcome.svg"
          alt="no data"
          width={"400vh"}
          height={"400vh"}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <h2 style={{ fontWeight: 'bold' }}>Welcome to Jarvis</h2>
          <ConnectButton moralisAuth={false} />
        </div>
      </div>

    </div>
  );
}

export default Login;

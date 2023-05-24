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
      ><div className="inner-home"
        style={{ display: "flex", justifyContent: "center", textAlign: "center", alignItems: 'center', flexDirection: "row", gap: "10vh" }}>
          <h1 style={{ padding: "50px 5px" }}>Welcome to Expense Tracker</h1>
          <img
            src="/images/welcome.svg"
            alt="no data"
            width={"300vh"}
            height={"300vh"}
          />
        </div>
        <ConnectButton style={{
          height: "7vh"
        }} moralisAuth={false} />
      </div>
    </div>
  );
}

export default Login;
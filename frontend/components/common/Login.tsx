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
          alignItems: "center",
          gap: "20px",
        }}
      >
        <img
          src="/images/welcome.svg"
          alt="no data"
          width={"300vh"}
          height={"300vh"}
        />
        <div 
        style={{display:'flex',
         flexDirection:'column', 
         alignItems:'center'}}>
          <h2 style={{ fontWeight: 'bold' }}>Welcome to Jarvis</h2>
          <ConnectButton moralisAuth={false}/>
        </div>
      </div>
    </div>
  );
}

export default Login;

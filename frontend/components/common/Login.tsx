import React, { useState, useEffect } from "react";
import { ConnectButton } from "web3uikit";
import style from "../../styles/Main.module.css";

function Login() {
  return (
    <div>
      <div  
      className={` ${style.wlcimg}`}
      >
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

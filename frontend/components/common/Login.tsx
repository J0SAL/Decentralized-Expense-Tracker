import React from "react";
import { ConnectButton } from "web3uikit";

function Login() {
  return (
    <div>
      <div className="wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
          minHeight: "95vh",
        }}
      >
        <img
          src="/images/welcome.svg"
          alt="no data"
          width={"300vh"}
          height={"300vh"}
          style={{ marginBottom: "1rem" }} // added marginBottom for desktop mode
        />
        <div className="welcome"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ padding: "5px 5px", margin: 0 }}>Welcome to Jarvis</h1>
          <ConnectButton moralisAuth={false} />
        </div>
      </div>
      <div style={{ height: "7vh" }}>
      </div>

      {/* Media query for mobile mode */}
      <style>
        {`
          .wrapper{
            gap: 5rem;
          }
          @media only screen and (max-width: 600px) {
            img {
              padding-top: 2rem; // remove margin-bottom for mobile mode
            }

            .wrapper{
              gap:0rem;
            }

            .welcome{
              margin-top: -12rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
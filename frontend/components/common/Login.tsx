import React from "react";
import { ConnectButton } from "web3uikit";
import Image from "react-bootstrap/Image";

function Login() {
  return (
    <div
      style={{
        backgroundColor: "lightpink",
      }}
    >
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
        <h2
          className="mb-2"
          style={{
            padding: "15px",
            marginLeft: "10px",
            display: "flex",
            justifyContent: "start",
          }}
        >
          Manage Your Expense Securely With {"  "}
          <strong
            style={{
              color: "tomato",
              marginLeft: "8px",
            }}
          >
            JARVIS!
          </strong>
        </h2>
        <img
          src="/images/expense.svg"
          alt="Expense"
          width={"100px"}
          height={"100px"}
        />
        <h1
          style={{
            marginBottom: "10px",
          }}
        ></h1>
        <ConnectButton moralisAuth={false} />
        <p
          style={{
            width: "70%",
          }}
        >
          Note : Jarvis is A web application backed by the power of
          Decentralization! The motive of the application is to assist the user
          in managing and maintaining transactions.This application provides
          visualizations in form of graphs giving users the ability to track by
          visualizing his/her expenses over a period of time.
        </p>
      </div>
    </div>
  );
}

export default Login;

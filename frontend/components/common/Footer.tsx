import React from "react";

function Footer() {
  return (
    <div
      className="py-3 d-flex justify-content-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.70)", //"rgb(232, 232, 232)"
        color: "white",
      }}
    >
      <p>
        {" "}
        Leave a ⭐ on{" "}
        <a
          style={{
            color: "deeppink",
          }}
          href="https://github.com/J0SAL/Decentralized-Expense-Tracker"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <span className="px-2">, made by</span>
        <a
          style={{
            color: "deeppink",
          }}
          href="https://bio.link/j0sal"
          target="_blank"
          rel="noreferrer"
        >
          @Joy Almeida
        </a>{" "}
        <span> | 2023 All rights reserved.</span>
      </p>
    </div>
  );
}

export default Footer;

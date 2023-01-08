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
      <h6>
        Made by{" "}
        <a href="https://bio.link/j0sal" target="_blank" rel="noreferrer">
          Joy Almeida
        </a>
      </h6>
    </div>
  );
}

export default Footer;

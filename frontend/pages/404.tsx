import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import classes from "../styles/error.module.css";

const hello = () => {
  return (
    <>
      <div className={classes.errorBox}>
        <img className={classes.image} src="/images/errorImg.png" alt="timer" />
        <div className={classes.erorMsg}>Oops! Page Not Found</div>
      </div>
    </>
  );
};

export default hello;

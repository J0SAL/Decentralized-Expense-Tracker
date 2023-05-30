import React from "react";
import Link from "next/link";
import { Button } from "react-bootstrap";
import classes from "../styles/error.module.css";

const hello = () => {
  return (
    <>
      <div className={classes.imageBox}>
        <img
          className={classes.image}
          src="/images/errorImg.png"
          alt="timer"
        />
      </div>
      <div className={classes.button}>
      <Link href="/">
        <Button variant="primary">Home</Button>{" "}
      </Link>
      </div>
    </>
  );
};

export default hello;

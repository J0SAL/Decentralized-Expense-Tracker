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
          src="https://i.ibb.co/G39013c/img-3.png"
          alt="img-3"
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

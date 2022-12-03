import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import PageNavbar from "../components/common/PageNavbar";
import Footer from "../components/common/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="Made by Joy Almeida" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageNavbar />
      <Component {...pageProps} />
      <Footer />
    </React.Fragment>
  );
}

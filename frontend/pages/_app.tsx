import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import PageNavbar from "../components/common/PageNavbar";
import Footer from "../components/common/Footer";
import { SpeechProvider } from "@speechly/react-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <SpeechProvider appId="7aa066e8-41d5-45c7-9f9b-0cfa0fef85ef">
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
      </SpeechProvider>
    </React.StrictMode>
  );
}

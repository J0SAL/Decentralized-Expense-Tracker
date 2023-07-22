import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import PageNavbar from "../components/common/PageNavbar";
import Footer from "../components/common/Footer";
import DataState from "../context/DataContext/dataState";
import { SpeechProvider } from "@speechly/react-client";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Loading from "../components/loadingAnimation";


export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  // Simulate loading or asynchronous tasks
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 3-second loading time
  }, []);
  
  return (
    <React.StrictMode>
      {loading ? ( 
        <Loading />
      ) : (
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <SpeechProvider appId="7aa066e8-41d5-45c7-9f9b-0cfa0fef85ef">
            <DataState>
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
            </DataState>
          </SpeechProvider>
        </NotificationProvider>
      </MoralisProvider>
      )}
    </React.StrictMode>
  );
}

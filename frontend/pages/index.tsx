import { Button, Container } from "react-bootstrap";
// import Overview from "../components/overview/Overview";
// import PerformanceGraph from "../components/performance/PerformanceGraph";
// import Performers from "../components/top-performers/Performers";
// import Transactions from "../components/transactions/Transactions";
import { useMoralis } from "react-moralis";
import Login from "../components/common/Login";
import dataContext from "../context/DataContext/dataContext";
import { useContext, useEffect, useState, lazy, Suspense } from "react";

const Overview = lazy(() => import("../components/overview/Overview"));
const Transactions = lazy(() => import("../components/transactions/Transactions"));
const PerformanceGraph = lazy(() => import("../components/performance/PerformanceGraph"));
const Performers = lazy(() => import("../components/top-performers/Performers"));

export default function HomePage() {
  const [showButton, setShowButton] = useState(false);
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const { updateUI, transactions } = useContext(dataContext);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else if(window.scrollY===0){
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  });

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  if (!isWeb3Enabled) return <Login />;
  return (
    <div style={{ backgroundColor: "rgba(232, 249, 252, 0.76)" }}>
      <Container className="mt-5 py-3 bg-white" >
      <Suspense fallback={<div>Loading...</div>}>
        <Overview />
        {transactions.length > 0 && (
          <div>
            <Transactions />
            <PerformanceGraph />
            <Performers />
          </div>
        )}
        </Suspense>
      </Container>
      <button
        className="btn"
        style={{
          backgroundColor: "purple",
          color: "white",
          width: "50px",
          height: "50px",
          position: "fixed",
          right: 10,
          bottom: 10,
          zIndex: 100,
          borderRadius: "30px",
        }}
        onClick={scrollToTop}
        hidden={!showButton}
      >
        ^
      </button>
    </div>
  );
}

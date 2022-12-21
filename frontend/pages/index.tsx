import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Overview from "../components/overview/Overview";
import PerformanceGraph from "../components/performance/PerformanceGraph";
import Performers from "../components/top-performers/Performers";
import Transactions from "../components/transactions/Transactions";

export default function HomePage() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
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
  return (
    <div style={{ backgroundColor: "rgba(232, 249, 252, 0.76)" }}>
      <Container className="mt-5 py-3 bg-white">
        <Overview />
        <Transactions />
        <PerformanceGraph />
        <Performers />
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

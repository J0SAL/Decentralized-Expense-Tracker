import React from "react";
import { Container } from "react-bootstrap";
import LineChart from "./LineChart";

function PerformanceGraph() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <h3 className="text-center">Perfomance</h3>
      <div className="mx-5 px-5">
        <LineChart />
      </div>
    </Container>
  );
}

export default PerformanceGraph;

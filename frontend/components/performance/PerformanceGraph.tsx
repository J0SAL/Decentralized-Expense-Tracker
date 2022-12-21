import React from "react";
import { Container } from "react-bootstrap";
import LineChart from "./LineChart";

function PerformanceGraph() {
  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center flex-column"
    >
      <h3 className="text-center">Yearly Performance</h3>
      <div className="mx-md-5 px-md-5">
        <LineChart />
      </div>
    </Container>
  );
}

export default PerformanceGraph;

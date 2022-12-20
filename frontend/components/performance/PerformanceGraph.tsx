import React from "react";
import { Container } from "react-bootstrap";
import LineChart from "./LineChart";

function PerformanceGraph() {
  return (
    <Container>
      <h3 className="text-center">Perfomance</h3>
      <div className="mx-5 px-5">
        <LineChart />
      </div>
    </Container>
  );
}

export default PerformanceGraph;

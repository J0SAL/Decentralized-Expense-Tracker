import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "./InputForm";
import { PieChart } from "./PieChart";

function Overview() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <h3 id="home" className="d-flex justify-content-center pb-2">
        Overview
      </h3>
      <Row gx={10}>
        <Col
          md={6}
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div>
            <InputForm />
          </div>
        </Col>
        <Col
          md={6}
          xs={12}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div style={{ width: "70%" }}>
            <PieChart />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Overview;

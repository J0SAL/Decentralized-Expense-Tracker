import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "./InputForm";
import { PieChart } from "./PieChart";

function Main() {
  return (
    <Container>
      <Row gx={10}>
        <Col md={6} xs={12} className="d-flex justify-content-center">
          <div>
            <InputForm />
          </div>
        </Col>
        <Col md={6} xs={12} className="d-flex justify-content-center">
          <div style={{ width: "60%" }}>
            <PieChart />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TopExpense from "./TopExpense";
import TopIncome from "./TopIncome";

function Performers() {
  return (
    <Container className="mb-5">
      <h3 className="text-center">Diversity</h3>
      <Row>
        <Col md={6}>
          <div
            style={{ width: "70%" }}
            className="justify-content-center d-flex flex-row mx-auto"
          >
            <TopExpense />
          </div>
        </Col>
        <Col md={6}>
          <div
            style={{ width: "70%" }}
            className=" justify-content-center d-flex flex-row mx-auto"
          >
            <TopIncome />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Performers;

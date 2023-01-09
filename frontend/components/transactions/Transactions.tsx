import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ExpenseChart from "./ExpenseChart";
import IncomeChart from "./IncomeChart";
import TransactionList from "./TransactionList";

function Transactions() {
  return (
    <Container style={{ minHeight: "70vh" }}>
      <h3 id="transactions" className="d-flex justify-content-center my-3">
        Your Transactions
      </h3>
      <Row gx={10}>
        <Col md={4} xs={12}>
          <div
            style={{ width: "90%", height: "100%" }}
            className="justify-content-center d-flex flex-column"
          >
            <IncomeChart />
          </div>
        </Col>
        <Col md={4} xs={12}>
          <div>
            <TransactionList />
          </div>
        </Col>
        <Col md={4} xs={12}>
          <div
            style={{ width: "90%", height: "100%" }}
            className="justify-content-center d-flex flex-column"
          >
            <ExpenseChart />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Transactions;

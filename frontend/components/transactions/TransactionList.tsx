import React from "react";
import { Col, Row } from "react-bootstrap";
import { BiMoney } from "react-icons/bi";
import styles from "../../styles/Scrollbar.module.css";

var transactions = [
  {
    id: 1,
    title: "Salary",
    amount: 10000,
    type: "income",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Salary",
    amount: 10000,
    type: "income",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 3,

    title: "Salary",
    amount: 10000,
    type: "expense",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 1,
    title: "Salary",
    amount: 10000,
    type: "income",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Salary",
    amount: 1234,
    type: "expense",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 3,

    title: "Salary",
    amount: 10000,
    type: "income",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 1,
    title: "Salary",
    amount: 122,
    type: "expense",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Salary",
    amount: 10000,
    type: "income",
    date: "2021-07-01T00:00:00.000Z",
  },
  {
    id: 3,

    title: "Salary",
    amount: 10000,
    type: "income",
    date: "2021-07-01T00:00:00.000Z",
  },
];

type TransactionListProps = {
  id: number;
  type: string;
  title: string;
  amount: number;
  date: string;
};
function TransactionList() {
  return (
    <div className="my-5 my-md-0">
      <div
        style={{ maxHeight: "72vh", overflowY: "auto", overflowX: "hidden" }}
        className={styles.scrollbar}
      >
        {transactions.map((transaction, key) => (
          <TransactionCard transaction={transaction} key={key} />
        ))}
      </div>
    </div>
  );
}

const TransactionCard = ({
  transaction,
}: {
  transaction: TransactionListProps;
}) => {
  return (
    <Row
      style={{
        border:
          transaction.type === "income"
            ? "1px solid #71e3a3"
            : "1px solid #eb4934",
        borderRadius: "5px",
      }}
      className="py-2 mx-1 my-1"
    >
      <Col xs={3} className="my-auto">
        <div
          style={{
            borderRadius: "60px",
            padding: "12px",
            background: transaction.type === "income" ? "green" : "red",
            height: "50px",
            width: "50px",
            textAlign: "center",
            color: "white",
          }}
        >
          <BiMoney />
        </div>
      </Col>
      <Col xs={5}>
        <div className="d-flex flex-column">
          <p
            style={{
              color: "white",
              backgroundColor:
                transaction.type === "income" ? "#71e3a3" : "#eb4934",
              margin: "0",
              width: "70px",
              height: "25px",
              padding: "0 12px",
              borderRadius: "20px",
              fontStyle: "italic",
              fontSize: "14px",
            }}
          >
            {transaction.type}
          </p>
          <h5>{transaction.title}</h5>
        </div>
      </Col>
      <Col xs={4} className="my-auto">
        <div>
          <p
            style={{
              fontSize: "small",
              fontStyle: "italic",
              marginBottom: "0px",
            }}
          >
            10 Dec 2022
          </p>
          <h4 className="py-0 ">₹{transaction.amount}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default TransactionList;

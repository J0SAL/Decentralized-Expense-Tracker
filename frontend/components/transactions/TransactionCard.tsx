import styles from "../../styles/Scrollbar.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import style from "../../styles/Main.module.css";
import { BiMoney } from "react-icons/bi";
import { Col, Row } from "react-bootstrap";
import { Transaction } from "./TransactionList";
import { dateString } from "../../utils/formatDate";

const TransactionCard = ({
  transaction,
  handleDelete,
}: {
  transaction: Transaction;
  handleDelete: CallableFunction;
}) => {
  return (
    <Row
      style={{
        border:
          transaction.type === 0 ? "1px solid #71e3a3" : "1px solid #eb4934",
        borderRadius: "5px",
      }}
      className="py-2 mx-1 my-1"
    >
      <Col xs={3} className="my-auto">
        <div
          style={{
            borderRadius: "60px",
            padding: "12px",
            background: transaction.type === 0 ? "green" : "red",
            height: "50px",
            width: "50px",
            textAlign: "center",
            color: "white",
          }}
        >
          <BiMoney />
        </div>
      </Col>
      <Col xs={4}>
        <div className="d-flex flex-column">
          <p
            style={{
              color: "white",
              backgroundColor: transaction.type === 0 ? "#71e3a3" : "#eb4934",
              margin: "0",
              width: "70px",
              height: "25px",
              padding: "0 12px",
              borderRadius: "20px",
              fontStyle: "italic",
              fontSize: "14px",
            }}
          >
            {transaction.type === 0 ? "income" : "expense"}
          </p>
          <h5>{transaction.category}</h5>
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
            {dateString(transaction.date)}
          </p>
          <h4 className="py-0 ">₹{transaction.amount}</h4>
        </div>
      </Col>
      <Col
        xs={1}
        className={`my-auto px-1
         ${style.deleteBtn}`}
      >
        <BsFillTrashFill
          onClick={() => handleDelete(transaction.id)}
          title="Delete Transaction"
        />
      </Col>
    </Row>
  );
};

export default TransactionCard;

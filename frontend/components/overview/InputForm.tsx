import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { FaCalendarAlt, FaAssistiveListeningSystems } from "react-icons/fa";
import { TfiMicrophone } from "react-icons/tfi";
import { useSpeechContext } from "@speechly/react-client";
import formatDate from "../../utils/formatDate";
import {
  incomeCategories,
  expenseCategories,
} from "../../constants/categories";

type initialStateType = {
  amount: undefined | number | string;
  category: string;
  type: string;
  date: string;
  description: string;
};
function InputForm() {
  const initialState: initialStateType = {
    amount: undefined,
    category: "default",
    type: "default",
    date: formatDate(new Date()),
    description: "",
  };

  const [formData, setFormData] = React.useState(initialState);
  const [loading, setLoading] = useState(false);
  const { segment, listening, attachMicrophone, start, stop } =
    useSpeechContext();

  const getSpeech = () => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (segment.intent.intent === "cancelTransaction") {
        setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;
          case "category":
            const c = `${e.value.charAt(0)}${e.value.toLowerCase().slice(1)}`;
            if (incomeCategories.map((iC) => iC.type).includes(c)) {
              setFormData({ ...formData, category: c, type: "income" });
            } else if (expenseCategories.map((iC) => iC.type).includes(c)) {
              setFormData({ ...formData, category: c, type: "expense" });
            }
            break;
          case "date":
            setFormData({ ...formData, date: e.value });
            break;
          default:
            break;
        }
      });
      if (
        segment.isFinal &&
        formData.amount &&
        formData.type &&
        formData.date &&
        formData.category
      ) {
        createTransaction();
      }
    }
  };
  useEffect(() => {
    getSpeech();
  }, [segment]);

  const handleChange = (e: React.ChangeEvent<HTMLElement> | undefined) => {
    let { name, value } = e!.target as HTMLInputElement;
    if (name === "date") value = formatDate(new Date(value));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fun = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Hello");
      }, 2000);
    });
  };
  const createTransaction = async () => {
    setLoading(true);
    try {
      // sent to blockchain
      await fun();
    } finally {
      setLoading(false);
    }
    setFormData(initialState);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLElement> | undefined) => {
    e!.preventDefault();
    console.log(formData);
    await createTransaction();
    (e!.target as HTMLFormElement).reset();
  };

  const canSubmit: boolean =
    formData.amount != undefined &&
    formData.category.length > 0 &&
    formData.category !== "default" &&
    formData.type.length > 0 &&
    formData.type !== "default" &&
    formData.date.length > 0 &&
    formData.description.length > 0 &&
    loading === false;

  const selectOptions: {
    type: string;
    color: string;
  }[] = formData.type === "income" ? incomeCategories : expenseCategories;
  return (
    <Card>
      <Card.Header as="h5" className="d-flex justify-content-center">
        Add Transaction
      </Card.Header>
      <Card.Body>
        <p>{segment && segment.words.map((w) => w.value).join(" ")}</p>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} xs={6}>
              <Form.Label htmlFor="transaction-type">Type</Form.Label>
              <Form.Select
                size="sm"
                name="type"
                onChange={handleChange}
                disabled={loading}
                defaultValue="default"
                value={formData.type}
              >
                <option value="default" disabled>
                  Select Transaction Type
                </option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label htmlFor="transaction-cat">
                Category{" "}
                {formData.type !== "" &&
                  formData.type !== "default" &&
                  `(${formData.type})`}
              </Form.Label>
              <Form.Select
                size="sm"
                name="category"
                onChange={handleChange}
                disabled={loading}
                defaultValue="default"
                value={formData.category}
              >
                <option value="default" disabled>
                  Select Category
                </option>
                {selectOptions.map((option, key) => (
                  <option
                    key={key}
                    value={option.type}
                    //   style={{ color: option.color }}
                  >
                    {option.type}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Form.Label htmlFor="transaction-amount">Amount</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>₹</InputGroup.Text>
            <Form.Control
              id="transaction-amount"
              placeholder="Enter Amount"
              type="number"
              name="amount"
              onChange={handleChange}
              disabled={loading}
              value={formData.amount}
              required
            />
          </InputGroup>

          <Form.Label htmlFor="transaction-date">Date</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaCalendarAlt />
            </InputGroup.Text>
            <Form.Control
              id="transaction-date"
              type="date"
              name="date"
              onChange={handleChange}
              disabled={loading}
              value={formData.date}
              required
            />
          </InputGroup>

          <Form.Label htmlFor="description">Description</Form.Label>
          <FloatingLabel label="Enter Description" className="mb-3">
            <Form.Control
              id="description"
              as="textarea"
              name="description"
              onChange={handleChange}
              placeholder="Enter Description"
              style={{ height: "80px" }}
              readOnly={loading}
              plaintext={loading}
              value={formData.description}
              required
            />
          </FloatingLabel>
          <div className="d-flex flex-row justify-content-evenly">
            <Button variant="primary" type="submit" disabled={!canSubmit}>
              {!loading ? (
                `Add ${formData.type !== "default" ? formData.type : ""}`
              ) : (
                <span className="spinner-border" />
              )}
            </Button>

            <Button variant="danger" onClick={attachMicrophone}>
              <TfiMicrophone />
            </Button>
            <Button variant="warning" onPointerDown={start} onPointerUp={stop}>
              {listening ? <FaAssistiveListeningSystems /> : <TfiMicrophone />}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default InputForm;

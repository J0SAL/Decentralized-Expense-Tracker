import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { useSpeechContext } from "@speechly/react-client";
import { formatDate } from "../../utils/formatDate";
import {
  incomeCategories,
  expenseCategories,
} from "../../constants/categories";
import dataContext from "../../context/DataContext/dataContext";
import { v4 as uuid } from "uuid";

type initialStateType = {
  amount: undefined | number | string;
  category: string;
  type: string;
  date: string;
  description: string;
};
function InputForm() {
  const initialState: initialStateType = {
    amount: 0,
    category: "default",
    type: "default",
    date: formatDate(new Date()),
    description: "",
  };
  const { addIncomeToContract, addExpenseToContract } = useContext(dataContext);
  const [formData, setFormData] = React.useState(initialState);
  const [loading, setLoading] = useState(false);
  const { segment } = useSpeechContext();
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (formData.date == "") return;
    let today = new Date();
    let inputDate = new Date(formData.date);
    if (inputDate > today) {
      setDateError("Date Cannot be after current day");
    } else {
      setDateError("");
    }
  }, [formData.date]);
  const getSpeech = () => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "income" });
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
      formData.description = "Added by Speechly";
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

  const createTransaction = async () => {
    setLoading(true);
    try {
      // send to blockchain
      if (formData.type == "income") {
        await addIncomeToContract({
          _id: uuid(),
          _amount: Number(formData.amount),
          _category: formData.category,
          _date: formData.date,
          _description: formData.description,
        });
      } else if (formData.type == "expense") {
        await addExpenseToContract({
          _id: uuid(),
          _amount: Number(formData.amount),
          _category: formData.category,
          _date: formData.date,
          _description: formData.description,
        });
      }
    } finally {
      setLoading(false);
      setFormData(initialState);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLElement> | undefined) => {
    e!.preventDefault();
    await createTransaction();

    (e!.target as HTMLFormElement).reset();
  };

  const canSubmit: boolean =
    formData.amount != 0 &&
    formData.category.length > 0 &&
    formData.category !== "default" &&
    formData.type.length > 0 &&
    formData.type !== "default" &&
    formData.date.length > 0 &&
    dateError == "" &&
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
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Row>
            <Col md={6} xs={6}>
              <Form.Label htmlFor="transaction-type">
                Type<span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                size="sm"
                name="type"
                onChange={handleChange}
                disabled={loading}
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
                  `(${formData.type})`}{" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                size="sm"
                name="category"
                onChange={handleChange}
                disabled={loading}
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
          <Form.Label htmlFor="transaction-amount">
            Amount<span className="text-danger">*</span>
          </Form.Label>
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

          <Form.Label htmlFor="transaction-date">
            Date<span className="text-danger">*</span>
            {dateError != "" ? (
              <i className="text-danger font-italic">{dateError}</i>
            ) : (
              ""
            )}
          </Form.Label>
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

          <Form.Label htmlFor="description">
            Description<span className="text-danger">*</span>
          </Form.Label>
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
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default InputForm;

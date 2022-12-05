import React, { useState } from "react";
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
import styles from "../../styles/Main.module.css";
import formatDate from "../../utils/formatDate";
import {
  incomeCategories,
  expenseCategories,
} from "../../constants/categories";

function InputForm() {
  const initialState = {
    amount: null,
    category: "",
    type: "",
    date: formatDate(new Date()),
    description: "",
  };

  const [formData, setFormData] = React.useState(initialState);
  const [loading, setLoading] = useState(false);
  //   const [selectOptions, setSelectOptions] = useState([]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLElement> | undefined) => {
    e!.preventDefault();
    console.log(formData);
    setLoading(true);
    try {
      // sent to blockchain
      await fun();
    } finally {
      setLoading(false);
    }
    setFormData(initialState);
    (e!.target as HTMLFormElement).reset();
  };

  const canSubmit: boolean =
    formData.amount != null &&
    formData.category.length > 0 &&
    formData.type.length > 0 &&
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
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} xs={6}>
              <Form.Label htmlFor="transaction-type">Type</Form.Label>
              <Form.Select
                size="sm"
                name="type"
                onChange={handleChange}
                disabled={loading}
              >
                <option disabled selected>
                  Select Transaction Type
                </option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label htmlFor="transaction-type">Category</Form.Label>
              <Form.Select
                size="sm"
                name="category"
                onChange={handleChange}
                disabled={loading}
              >
                <option selected disabled>
                  Select {formData.type} Category
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
          <Form.Label htmlFor="transaction-type">Amount</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>₹</InputGroup.Text>
            <Form.Control
              id="transaction-type"
              placeholder="Enter Amount"
              type="number"
              name="amount"
              onChange={handleChange}
              disabled={loading}
              required
            />
          </InputGroup>

          <Form.Label htmlFor="transaction-type">Date</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaCalendarAlt />
            </InputGroup.Text>
            <Form.Control
              id="transaction-type"
              placeholder="Enter Amount"
              type="date"
              name="date"
              onChange={handleChange}
              disabled={loading}
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
              required
            />
          </FloatingLabel>

          <Button variant="primary" type="submit" disabled={!canSubmit}>
            {!loading ? (
              `Add ${formData.type}`
            ) : (
              <span className="spinner-border" />
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default InputForm;

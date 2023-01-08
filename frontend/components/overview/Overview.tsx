import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import InputForm from "./InputForm";
import { PieChart } from "./PieChart";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
function Overview() {
  const { segment } = useSpeechContext();
  const [hint, setHint] = useState<boolean>(false);
  return (
    <Container style={{ minHeight: "100vh" }}>
      <h3 id="home" className="d-flex justify-content-center pb-2">
        Overview
      </h3>
      {hint && (
        <p className="text-center">
          <i>Try Saying, "Add Income for ₹100 in Category Salary for Monday"</i>
        </p>
      )}
      <p className="text-center">
        {segment && segment.words.map((w) => w.value).join(" ")}
      </p>
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
      <PushToTalkButtonContainer>
        <span onClick={() => setHint(true)}>
          <PushToTalkButton />
        </span>
      </PushToTalkButtonContainer>
    </Container>
  );
}

export default Overview;

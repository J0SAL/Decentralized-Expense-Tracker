import { Container } from "react-bootstrap";
import Overview from "../components/overview/Overview";
import PerformanceGraph from "../components/performance/PerformanceGraph";
import TopExpense from "../components/top-performers/TopExpense";
import TopIncome from "../components/top-performers/TopIncome";
import Transactions from "../components/transactions/Transactions";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "rgba(232, 249, 252, 0.76)" }}>
      <Container className="mt-5 py-3 bg-white">
        <Overview />
        <Transactions />
        <PerformanceGraph />
        <TopIncome />
        <TopExpense />
      </Container>
    </div>
  );
}

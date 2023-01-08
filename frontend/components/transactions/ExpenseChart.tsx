import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";
import { expenseColor } from "../../constants/categories";
import Image from "next/image";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["No Color"],
  datasets: [
    {
      label: "amount",
      data: [0],
      backgroundColor: ["white"],
    },
  ],
};

function ExpenseChart() {
  const { overview, expenses } = useContext(dataContext);
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    setChartData({
      labels: Object.keys(expenses),
      datasets: [
        {
          label: "Amount",
          data: Object.values(expenses),
          backgroundColor: Object.keys(expenses).map(
            (cat: string) => expenseColor[cat as keyof typeof expenseColor]
          ),
        },
      ],
    });
  }, [expenses]);
  return (
    <div>
      <h4 className="d-flex justify-content-center">
        Total Expenses: ₹ {overview.expense}
      </h4>
      {overview.expense === 0 ? (
        <img
          src="/images/no_transactions.svg"
          alt="no data"
          width={"80%"}
          height={"80%"}
        />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
}

export default ExpenseChart;

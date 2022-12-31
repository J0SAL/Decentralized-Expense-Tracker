import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";
import { expenseColor } from "../../constants/categories";

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
    data.labels = Object.keys(expenses);
    data.datasets[0].data = Object.values(expenses);
    data.datasets[0].backgroundColor = Object.keys(expenses).map(
      (cat: string) => expenseColor[cat]
    );
    setChartData(data);
  }, [expenses]);
  return (
    <div>
      <h4 className="d-flex justify-content-center">
        Total Expenses: ₹ {overview.expense}
      </h4>
      <Pie data={data} />
    </div>
  );
}

export default ExpenseChart;

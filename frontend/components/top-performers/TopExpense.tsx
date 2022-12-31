import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { dougnnutText } from "./TopIncome";
ChartJS.register(ArcElement, Tooltip, Legend);
import { expenseColor } from "../../constants/categories";
import dataContext from "../../context/DataContext/dataContext";

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

function TopExpense() {
  const { expenses } = useContext(dataContext);
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    const top5 = Object.entries(expenses) // create Array of Arrays with [key, value]
      .sort(([, a], [, b]) => b - a) // sort by value, descending (b-a)
      .slice(0, 5);

    console.log(top5);
    data.labels = top5.map((e) => e[0]);
    data.datasets[0].data = top5.map((e) => e[1] as number);
    data.datasets[0].backgroundColor = top5.map(
      (e) => expenseColor[e[0] as string]
    );

    setChartData(data);
  }, [expenses]);
  return (
    <div className="text-center">
      <h4>Top 5 Expense Sources</h4>
      <Doughnut
        data={chartData}
        plugins={[dougnnutText]}
        options={{ cutout: "70%" }}
      />
    </div>
  );
}

export default TopExpense;

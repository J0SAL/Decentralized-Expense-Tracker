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
      .sort(([, a], [, b]) => (b as number) - (a as number)) // sort by value, descending (b-a)
      .slice(0, 5);

    setChartData({
      labels: top5.map((e) => e[0]),
      datasets: [
        {
          label: "Amount",
          data: top5.map((e) => e[1] as number),
          backgroundColor: top5.map(
            (e) => expenseColor[e[0] as keyof typeof expenseColor]
          ),
        },
      ],
    });
  }, [expenses]);

  return (
    <div className="text-center">
      <h4>Top Expense Sources</h4>

      {Object.keys(expenses).length !== 0 ? (
        <Doughnut
          data={chartData}
          plugins={[dougnnutText]}
          options={{ cutout: "70%" }}
        />
      ) : (
        <img
          src="/images/no_transactions.svg"
          alt="no data"
          width={"80%"}
          height={"80%"}
        />
      )}
    </div>
  );
}

export default TopExpense;

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { dougnnutText } from "./TopIncome";
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Green", "Yellow", "Blue", "Purple"],
  datasets: [
    {
      data: [300, 50, 100, 40, 120],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB"],
      borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB"],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#FF6384",
        "#36A2EB",
      ],
    },
  ],
  text: "23%",
};

function TopExpense() {
  return (
    <div className="text-center">
      <h4>Top 5 Expense Sources</h4>
      <Doughnut
        data={data}
        plugins={[dougnnutText]}
        options={{ cutout: "70%" }}
      />
    </div>
  );
}

export default TopExpense;

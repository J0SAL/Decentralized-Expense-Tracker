import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "Amount",
      data: [0, 0],
      backgroundColor: ["#10ac6e", "#ee8d68"],
      borderColor: ["#0bc77e", "#ffae8a"],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  const [piedata, setPieData] = useState(data);
  const { overview } = useContext(dataContext);
  useEffect(() => {
    let tempdataset = [...piedata.datasets];
    tempdataset[0] = {
      ...tempdataset[0],
      ["data"]: [overview.income, overview.expense],
    };

    setPieData({
      ...piedata,
      datasets: tempdataset,
    });
  }, [overview]);

  return (
    <div>
      <h4 className="d-flex justify-content-center">
        You Balance: ₹ {overview.income - overview.expense}
      </h4>
      {overview.income - overview.expense !== 0 ? (
        <Pie data={piedata} />
      ) : (
        <img
          src="/images/empty.svg"
          alt="no data"
          width={"80%"}
          height={"80%"}
        />
      )}
    </div>
  );
}

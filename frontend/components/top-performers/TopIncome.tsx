import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";
import { incomeColor } from "../../constants/categories";

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

export const dougnnutText = {
  id: "doughnutText",
  afterDatasetDraw(chart: any, args: any, pluginOptions: any) {
    const {
      ctx,
      data,
      options,
      _active,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    ctx.save();

    let x, y;
    if (_active && _active.length) {
      x = _active[0].element.x;
      y = _active[0].element.y;

      const dataLabel = data.labels[_active[0].index];
      const dataValue = data.datasets[0].data[_active[0].index];
      const textColor = data.datasets[0].backgroundColor[_active[0].index];

      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;
      ctx.fillText(dataLabel + ": " + dataValue, x, y);
    }
  },
};

function TopIncome() {
  const { incomes } = useContext(dataContext);
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    const top5 = Object.entries(incomes) // create Array of Arrays with [key, value]
      .sort(([, a], [, b]) => (b as number) - (a as number)) // sort by value, descending (b-a)
      .slice(0, 5);

    setChartData({
      labels: top5.map((e) => e[0]),
      datasets: [
        {
          label: "Amount",
          data: top5.map((e) => e[1] as number),
          backgroundColor: top5.map(
            (e) => incomeColor[e[0] as keyof typeof incomeColor]
          ),
        },
      ],
    });
  }, [incomes]);
  return (
    <div className="text-center">
      <h4>Top Income Sources</h4>

      {Object.keys(incomes).length !== 0 ? (
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

export default TopIncome;

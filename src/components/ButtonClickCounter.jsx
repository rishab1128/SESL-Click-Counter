import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "./ButtonClickCounter.css";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

function ButtonClickCounter() {
  const [count, setCount] = useState(
    parseInt(localStorage.getItem("buttonClickCount")) || 0
  );

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Button clicks by city",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  function calculateChartData(clicksByCity) {
    const cities = Object.keys(clicksByCity);
    const clickCounts = Object.values(clicksByCity);
    const backgroundColors = cities.map((city) => {
      const color = Math.floor(Math.random() * 16777215).toString(16);
      return `#${color}`;
    });

    setChartData({
      labels: cities,
      datasets: [
        {
          label: "Button clicks by city",
          data: clickCounts,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }

  function handleClick() {
    const newCount = count + 1;
    setCount(newCount);

    const clicksByCity = JSON.parse(localStorage.getItem("buttonClicksByCity")) || {};
    const city = prompt("Enter your city:");
    clicksByCity[city] = (clicksByCity[city] || 0) + 1;

    localStorage.setItem("buttonClickCount", newCount);
    localStorage.setItem("buttonClicksByCity", JSON.stringify(clicksByCity));

    calculateChartData(clicksByCity);
  }

  return (
    <div className="button-click-counter">
      <button className="click-button" onClick={handleClick}>
        Click me!
      </button>
      <p className="click-count">You've clicked the button {count} times.</p>
      <div className="chart-container">
        <Doughnut data={chartData} />
        <div className="chart-legend">
          {chartData.labels.map((label, index) => (
            <div className="chart-legend-item" key={index}>
              <div
                className="chart-legend-color"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              ></div>
              <div>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ButtonClickCounter;

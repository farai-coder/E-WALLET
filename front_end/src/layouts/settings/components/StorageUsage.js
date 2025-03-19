// src/components/MyDoughnutChart.js
"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StorageUsage() {

let data= [
  {
    label: "Captured images",
    value: 55,
    color: "rgba(0, 43, 73, 1)",
    cutout: "50%",
  },
  {
    label: "Detail Information",
    value:15,
    color: "rgba(0, 103, 160, 1)",
    cutout: "50%",
  },
  {
    label: "Free space",
    value: 80,
    color: "rgba(83, 217, 217, 1)",
    cutout: "50%",
  },
]

const options = {
    plugins: {
      doughnut: {
        cutoutPercentage: 50,
      },
    },
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return( 
    <div style={{width: '35%', height: '35%'}}>
        <Doughnut data={finalData}  options={options}/>
    </div>);
}
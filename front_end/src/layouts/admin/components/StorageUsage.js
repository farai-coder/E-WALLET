"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StorageUsage() {
  const data = [
    {
      label: "Captured images",
      value: 55,
      color: "rgba(0, 43, 73, 1)",
    },
    {
      label: "Detail Information",
      value: 15,
      color: "rgba(0, 103, 160, 1)",
    },
    {
      label: "Free space",
      value: 80,
      color: "rgba(83, 217, 217, 1)",
    },
  ];

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend as we will display custom labels
      },
    },
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '25%', height: '25%' }}>
        <Doughnut data={finalData} options={options} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', alignItems: 'center', mx: 1 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: '35%',
                mr: 1,
              }}
            />
            <Typography variant="body2">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

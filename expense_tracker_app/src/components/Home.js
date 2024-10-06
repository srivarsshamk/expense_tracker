import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../styles/Home.css';

// Ensure chart.js is properly imported
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register components needed for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const data = {
    labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'],
    datasets: [
      {
        label: 'Expenses',
        data: [100, 200, 150, 75, 50],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="home-page">
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Home;

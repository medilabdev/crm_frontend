import React from 'react'
import { Bar } from 'react-chartjs-2';

const CompanyRecap = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Sembunyikan legend
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.raw}`; // Menampilkan data dengan tanda persen
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Sembunyikan garis grid di sumbu X
            },
          },
          y: {
            beginAtZero: true,
            max: 60,
            ticks: {
              stepSize: 10,
            },
            grid: {
                color: "rgba(229, 231, 235, 1)", // Warna grid garis di sumbu Y
            },
          },
        },
      };
      const data = {
        labels: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", 
    "Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", 
    "Nov 2024", "Dec 2024"],
        datasets: [
          {
            label: "Company Created",
            data: [40, 25, 45, 30, 50, 35, 20, 45, 50],
            backgroundColor: "rgba(34, 197, 94, 1)", // Warna biru untuk bar utama
            borderRadius: 5,
            barPercentage: 0.5,
          },
        ],
      };
  return (
    <div className='col-md-6 mb-3' style={{ height: "350px"}}>
        <h3>Company Created</h3>
        <p>Company received across all channels</p>
        <Bar data={data} options={options} />
    </div>
  )
}

export default CompanyRecap
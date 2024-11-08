import React from 'react'
import { Card, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';

const DealsRecap = () => {
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
      const dataDeals = {
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

      const stages = [
        { label: "Leads", value: 100, color: "#f87171", tooltip: "Leads: 2000" },
        { label: "Approaching", value: 90, color: "#fde047", tooltip: "Approaching: 1800" },
        { label: "Decide", value: 80, color: "#93c5fd", tooltip: "Offer: 1600" },
        { label: "Closed Won", value: 60, color: "#86efac", tooltip: "Closed Won: 1200" },
        { label: "Implementation", value: 53, color: "#86efac", tooltip: "Implementation: 1060" },
      ];
  return (
    <div className='col-md' >
          <h3 className='fw-bold'>Data Deals</h3>
        <div className="row">
            <div className="col-md-6" >
                <Card className='p-4' style={{ height: "400px" }}>
                <h4>Deals Created</h4>
                <p>Deals received across all channels</p>
                <Bar data={dataDeals} options={options} className='mb-4'/>
                </Card>
            </div>
            <div className="col-md-6" >
            <Card className='p-4' style={{ height: "400px" }}>
            <h4>Lead Conversion</h4>
            <p>Stages of deals & conversion</p>
  
            {stages.map((stage, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span>{stage.label}</span>
                <span>{stage.value}%</span>
                </div>
                <OverlayTrigger 
                placement="top"
                overlay={<Tooltip>{stage.tooltip}</Tooltip>}
                >
                <ProgressBar
                    now={stage.value}
                    style={{
                    height: "20px",
                    backgroundColor: "#e5e7eb",
                    }}
                    variant="custom"
                >
                    <ProgressBar
                    now={stage.value}
                    style={{
                        backgroundColor: stage.color,
                    }}
                    />
                </ProgressBar>
                </OverlayTrigger>
            </div>
            ))}
            </Card>
            </div>
        </div>
       
    </div>
  )
}

export default DealsRecap
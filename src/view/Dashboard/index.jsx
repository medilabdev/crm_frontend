import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Template/Sidebar";
import Topbar from "../../components/Template/Topbar";
import Main from "../../components/Template/Main";
import Footer from "../../components/Template/Footer";
import { LineChart } from "./LineChart";
import { ChartBar } from "./ChartBar";
import { DoughnutChart } from "./Doughnut";
import { Card } from "react-bootstrap";
import { ChartVertikal } from "./ChartVertikal";
import { ChartLineDoang } from "./ChartLineDoang";
import { ChartWinLose } from "./ChartWinLose";
import axios from "axios";

function Dashboard() {
  const token = localStorage.getItem('token');
  const [stagingDeals, setStagingDeals] = useState([]);
  const MAX_RETRIES = 3;
  const getResultStage =  (retryCount = 0) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/report/staging/deals`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => setStagingDeals(res.data.staging_data))
    .catch(async(err) => {
      if (err.response.data.message === "Unauthenticated" || err.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      if(err.response.status === 429 && retryCount < MAX_RETRIES){
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay))
        await getResultStage(retryCount + 1)
      }
    });
  }
  useEffect(() => {
    getResultStage()
  }, [token])
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                  <ol className="breadcrumb mt-2">
                    <li className="breadcrumb-item">Dashboard</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
            <Card className="shadow">
                <ChartWinLose />
              </Card>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6">
             
            </div>
            <div className="col-md-6">
              <Card>
                <DoughnutChart />
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="shadow">
                <ChartVertikal />
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="shadow">
                <ChartLineDoang />
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="shadow">
                <ChartWinLose />
              </Card>
            </div>
          </div> */}
        </div>
        <Footer />
      </Main>
    </body>
  );
}

export default Dashboard;

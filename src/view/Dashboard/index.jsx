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
import Map from "./Map";
import TopSales from "./TopSales";
import ContactRecap from "./ContactRecap";
import CompanyRecap from "./CompanyRecap";
import DealsRecap from "./DealsRecap";

function Dashboard() {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <div className="container" style={{ marginBottom: "3.4rem"}}>
          <div className="row">
            <div className="col">
              <div className="pagetitle">
                <h1>Dashboard</h1>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <TopSales />
            <ContactRecap />
            <CompanyRecap />
            <DealsRecap />
          </div>
          
          {/* <div className="row">
              <div className="col-md-6">
              <Card className="shadow">
                <ChartWinLose />
              </Card>
              </div>
          </div>
          <div className="row">
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

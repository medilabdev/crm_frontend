import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import axios from "axios";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);


export function ChartWinLose() {
  const token = localStorage.getItem('token');
const [stagingDeals, setStagingDeals] = useState([]);
const [inputDate, setInputDate] = useState([])
const [resultDate, setResultDate] = useState([])
const getResultStage =  async(resultDate, retryCount = 0) => {
  try {
    const params = {
      startDate: resultDate.startDate || '2023-12-01',
      endDate: resultDate.endDate || '2024-02-14',
    };
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/report/staging/deals`, {
    headers:{
      Authorization: `Bearer ${token}`
    },
    params: params
  }) 
  setStagingDeals(response.data.staging_data);
  } catch (error) {
    if (error.response.data.message === "Unauthenticated" || error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    else if (error.response && error.response.status === 429) {
      const maxRetries = 3;
      if (retryCount < maxRetries) {
        setTimeout(() => {
          getResultStage(retryCount + 1);
        }, 2000);
      } else {
        console.error('Max retry attempts reached. Unable to complete the request.');
      }
    }else{
      console.error('error' , error);
    }
  }
}

const handleInputDate = (e) => {
    setInputDate({
      ...inputDate,
      [e.target.name]: e.target.value
    })
} 


const handleSubmitDate = (e) => {
  e.preventDefault()
  const searchDate = {
    startDate: inputDate.dateIn || "",
    endDate :inputDate.dateOut || ""
  }
  setResultDate(searchDate)
}

useEffect(()=> {
  getResultStage(resultDate)
}, [token, resultDate])


const data = {
  labels: stagingDeals.map((data) => data?.staging?.name),
  datasets: [
    {
      type:"bar",
      label: "Deal Count",
      backgroundColor: stagingDeals.map((data) => {
        const status = data?.staging?.name;
        switch (status) {
          case "Closed Lost":
            return "#DF826C"; // Merah untuk "Clost Lost"
          case "Closed Won":
            return "#74E291"; // Hijau untuk "Clost Win"
          default:
            return "#8EACCD"; // Warna default jika tidak ada kondisi yang cocok
        }
      }),
      data:stagingDeals.map((data) => data?.deal_count),
      borderColor:"white",
      borderWidth: 2
    }
  ]
}

  return(
    <>
    <div className="container">
      <form action="" method="post">
      <div className="row mt-4 mb-3">
      <div className="col-md-12 text-center mb-2">
          <h5 className="fw-semibold">Chart Result Stage</h5>
      </div>
        <div className="col-md-5">
    <input type="date" name="dateIn" className="form-control" onChange={handleInputDate}  style={{borderColor:"black"}}/>
        </div>
        <div className="col-md-5">
    <input type="date" name="dateOut" className="form-control" id="" onChange={handleInputDate} style={{borderColor:"black"}}/>
        </div>
        <div className="col-md-2">
          <button className="btn btn-success" style={{ fontSize: "0.85rem" }} onClick={handleSubmitDate}>Submit</button>
        </div>
      </div>
      </form>
    </div>
    <Chart type="bar" data={data}/>;
    </>
  ) 
}

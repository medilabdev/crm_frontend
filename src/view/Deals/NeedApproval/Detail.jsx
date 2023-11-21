import React, { useEffect, useState } from 'react'
import Topbar from '../../../components/Template/Topbar'
import Sidebar from '../../../components/Template/Sidebar'
import Main from '../../../components/Template/Main'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DetailNeedApproval = () => {
    const token = localStorage.getItem("token")
    const {uid} = useParams();
    const [detail, setDetail] = useState({});
    
    
    const getDetail = (token, uid) => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_URL}/deals/${uid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setDetail(res.data.data))
          .catch((error) => {
            if (error.response?.data?.message === "Unauthenticated.") {
              localStorage.clear();
              window.location.href = "/login";
            }
          });
      };
      useEffect(() => {
        getDetail(token, uid)
      }, [token, uid])
  return (
    <body id='body'>
        <Topbar />
        <Sidebar />
        <Main>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="pagetitle">
                            <h1>Detail Need Approval</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    </body>
  )
}

export default DetailNeedApproval
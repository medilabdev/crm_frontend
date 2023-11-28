import React from "react";
import Topbar from "../../../components/Template/Topbar";
import Sidebar from "../../../components/Template/Sidebar";
import Main from "../../../components/Template/Main";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UserAccessMenu = () => {
  const token = localStorage.getItem("token");
  const [access, setAccess] = useState([]);
  const [search, setSearch] = useState([]);

  const getAccessMenu = (token) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user-access-menus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setAccess(data);
        setSearch(data);
      });
  };

  useEffect(() => {
    getAccessMenu(token);
  }, [token]);
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main></Main>
    </body>
  );
};

export default UserAccessMenu;

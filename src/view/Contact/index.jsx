import React from "react";
import Topbar from "../../components/Template/Topbar";
import Sidebar from "../../components/Template/Sidebar";
import Footer from "../../components/Template/Footer";
import Main from "../../components/Template/Main";
const Contact = () => {
  return (
    <body id="body">
      <Topbar />
      <Sidebar />
      <Main>
        <Footer />
      </Main>
    </body>
  );
};

export default Contact;

import React from "react";
import {
  BrowserRouter,
  Routes,
  Navigate,
  useLocation,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "../view/Dashboard";
import User from "../view/User";
import ShowUser from "../view/User/show";
import Auth from "../view/Auth";
import Contact from "../view/Contact";
import SingleContact from "../view/Contact/SingleContact";
import Swal from "sweetalert2";
import BulkChange from "../view/Contact/BulkChange";
import Company from "../view/Company";
import SingleCompany from "../view/Company/SingleCompany";
import FileUploadCompany from "../view/Company/FileUpload";
import BulkChangeCompany from "../view/Company/BulkChange";
import Products from "../view/Products";
import Documents from "../view/Documents";
import UploadFileContact from "../view/Contact/UploadFile";
import EditContact from "../view/Contact/Edit";
import EditCompany from "../view/Company/Edit";
const Login = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />

        <Route
          path="/"
          element={
            <Login>
              <Dashboard />
            </Login>
          }
        />

        <Route
          path="/users"
          element={
            <Login>
              <User />
            </Login>
          }
        />

        <Route
          path="/users/:uid"
          element={
            <Login>
              <ShowUser />
            </Login>
          }
        />

        <Route
          path="/contact"
          element={
            <Login>
              <Contact />
            </Login>
          }
        />

        <Route
          path="/single-contact"
          element={
            <Login>
              <SingleContact />
            </Login>
          }
        />

        <Route
          path="/contact/bulk-change"
          element={
            <Login>
              <BulkChange />
            </Login>
          }
        />
        <Route
          path="/contact/upload-file"
          element={
            <Login>
              <UploadFileContact />
            </Login>
          }
        />
        <Route
          path="/contact/:uid/edit"
          element={
            <Login>
              <EditContact />
            </Login>
          }
        />

        <Route
          path="/company"
          element={
            <Login>
              <Company />
            </Login>
          }
        />

        <Route
          path="/company/single-company"
          element={
            <Login>
              <SingleCompany />
            </Login>
          }
        />

        <Route
          path="/company/upload-file"
          element={
            <Login>
              <FileUploadCompany />
            </Login>
          }
        />

        <Route
          path="/company/bulkchange"
          element={
            <Login>
              <BulkChangeCompany />
            </Login>
          }
        />
        <Route
          path="/company/:uid/edit"
          element={
            <Login>
              <EditCompany />
            </Login>
          }
        />

        <Route
          path="/products"
          element={
            <Login>
              <Products />
            </Login>
          }
        />

        <Route
          path="/documents"
          element={
            <Login>
              <Documents />
            </Login>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

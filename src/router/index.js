import React from "react";
import {
  BrowserRouter,
  Routes,
  Navigate,
  useLocation,
  Route,
} from "react-router-dom";
import Dashboard from "../view/Dashboard";
import User from "../view/User";
import ShowUser from "../view/User/show";
import Auth from "../view/Auth";
import Contact from "../view/Contact";
import SingleContact from "../view/Contact/SingleContact";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/users/:uid" element={<ShowUser />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/single-contact" element={<SingleContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

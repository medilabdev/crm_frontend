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
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

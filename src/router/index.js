import React from "react";
import { BrowserRouter, Routes, Navigate, Route, } from "react-router-dom";
import Dashboard from "../view/Dashboard";
import User from "../view/User";
import ShowUser from "../view/User/show";
import Auth from "../view/Auth";
import Contact from "../view/Contact";
import SingleContact from "../view/Contact/SingleContact";
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
import ShowCompany from "../view/Company/ShowCompany";
import Templates from "../view/Documents/Templates";
import ShortCode from "../view/Documents/ShortCode";
import Deals from "../view/Deals";
import SingleDeals from "../view/Deals/SingleDeals";
import BulkChangeDeals from "../view/Deals/BulkChange";
import EditPackageProduct from "../view/Products/EditPackageProduct";
import Properties from "../view/Properties";
import Position from "../view/Properties/Position";
import Roles from "../view/Properties/Roles";
import Source from "../view/Properties/Source";
import CompanyType from "../view/Properties/CompanyType";
import DealsCategory from "../view/Properties/DealsStage";
import NeedsApproval from "../view/Deals/NeedApproval";
import EditDeals from "../view/Deals/SingleDeals/EditDeals";
import Accounting from "../view/Deals/Accounting";
import Task from "../view/Task";
import BulkChangeTask from "../view/Task/BulkChange";
import UploadFileTask from "../view/Task/UploadFile";
import DetailNeedApproval from "../view/Deals/NeedApproval/Detail";
import UploadDeals from "../view/Deals/SingleDeals/UploadDeals";
import CategoryExpanse from "../view/Properties/CategoryExpanse";
import OtorisasiMenu from "../view/Properties/OtorisasiMenu";
import UserAccessMenu from "../view/Properties/UserAccessMenu";
import DetailAccessMenu from "../view/Properties/UserAccessMenu/DetailAccessMenu";
import AccountProfil from "../view/User/AccountProfile";

import EditTaskFix from "../view/Task/EditTask";
import SecondDeals from "../view/SecondDeals";
import CreateSecondDeals from "../view/SecondDeals/create";
import NeedApprovalSecondDeals from "../view/SecondDeals/NeedApprovalSecondDeals";
import DealsVersion from "../view/Properties/DealsVersion";
import EditDataSecondDeals from "../view/SecondDeals/Edit";
import AssignDealsSales from "../view/SecondDeals/AssignDeals";
import SalesAmbasador from "../view/SalesAmbasador";
import WeeklyTask from "../view/Weekly/WeeklyTask"
import WeeklyReport from "../view/Weekly/WeeklyReport";
import CreateWeeklyTask from "../view/Weekly/WeeklyTask/Create";
import EditTaskWeekly from "../view/Weekly/WeeklyTask/Edit";
import FillTaskWeekly from "../view/Weekly/FillTaskWeekly";
import ActivityTechnician from "../view/ActivityTechnicians";
import DetailActivity from "../view/ActivityTechnicians/details";
import CreateTechnicianTicket from "../view/ActivityTechnicians/create";
import ApprovalCenter from "../view/Contact/ApprovalCenter";
import WeeklyPlanningForm from "../view/TaskNew/WeeklyPlanningForm";
import WeeklyPlanningPreview from "../view/TaskNew/WeeklyPlanningPreview";
import WeeklyPlanningReportMockup from "../view/TaskNew/WeeklyPlanningReportMockup";
import WeeklyPlanningSystem from "../view/TaskNew/WeeklyPlanningSystem";
import WeeklyPlanningTestPage from "../view/TaskNew/WeeklyPlanningTestPage";
import WeeklyPlanningSimulation from "../view/TaskNew/WeeklyPlanningSimulation";
const Login = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function Error() {
  return <h2>Halaman tidak ada</h2>;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          exact
          path="/"
          element={
            <Login>
              <Dashboard />
            </Login>
          }
        />
        <Route
          exact
          path="/users"
          element={
            <Login>
              <User />
            </Login>
          }
        />
        <Route
          exact
          path="/users/:uid"
          element={
            <Login>
              <ShowUser />
            </Login>
          }
        />
        <Route
          exact
          path="/contact"
          element={
            <Login>
              <Contact />
            </Login>
          }
        />
        <Route
          exact
          path="/single-contact"
          element={
            <Login>
              <SingleContact />
            </Login>
          }
        />
        <Route
          exact
          path="/contact/bulk-change"
          element={
            <Login>
              <BulkChange />
            </Login>
          }
        />
        <Route
          exact
          path="/contact/upload-file"
          element={
            <Login>
              <UploadFileContact />
            </Login>
          }
        />
        <Route
          exact
          path="/contact/:uid/edit"
          element={
            <Login>
              <EditContact />
            </Login>
          }
        />
        <Route exact path="/approvals/contact-deletions" element={<ApprovalCenter />} />
        <Route
          exact
          path="/company"
          element={
            <Login>
              <Company />
            </Login>
          }
        />
        <Route
          exact
          path="/company/single-company"
          element={
            <Login>
              <SingleCompany />
            </Login>
          }
        />
        <Route
          exact
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
          exact
          path="/company/:uid/edit"
          element={
            <Login>
              <EditCompany />
            </Login>
          }
        />
        <Route
          exact
          path="/company/:uid"
          element={
            <Login>
              <ShowCompany />
            </Login>
          }
        />
        <Route
          exact
          path="/deals"
          element={
            <Login>
              <Deals />
            </Login>
          }
        />
        <Route
          exact
          path="/products"
          element={
            <Login>
              <Products />
            </Login>
          }
        />
        <Route
          exact
          path="/packed-product/:uid/edit"
          element={
            <Login>
              <EditPackageProduct />
            </Login>
          }
        />
        <Route
          exact
          path="/documents"
          element={
            <Login>
              <Documents />
            </Login>
          }
        />
        <Route
          exact
          path="/templates"
          element={
            <Login>
              <Templates />
            </Login>
          }
        />
        <Route
          exact
          path="/short-code"
          element={
            <Login>
              <ShortCode />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/single-deals"
          element={
            <Login>
              <SingleDeals />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/bulk-change"
          element={
            <Login>
              <BulkChangeDeals />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/need-approval"
          element={
            <Login>
              <NeedsApproval />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/:uid/edit"
          element={
            <Login>
              <EditDeals />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/:uid/accounting"
          element={
            <Login>
              <Accounting />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/detail/:uid/need-approval"
          element={
            <Login>
              <DetailNeedApproval />
            </Login>
          }
        />
        <Route
          exact
          path="/deals/upload-deals"
          element={
            <Login>
              <UploadDeals />
            </Login>
          }
        />
        <Route
          exact
          path="/task"
          element={
            <Login>
              <Task />
            </Login>
          }
        />
        <Route
          exact
          path="/task/bulk-change"
          element={
            <Login>
              <BulkChangeTask />
            </Login>
          }
        />
        <Route
          exact
          path="/task/upload-file"
          element={
            <Login>
              <UploadFileTask />
            </Login>
          }
        />
        <Route
          exact
          path="/properties"
          element={
            <Login>
              <Properties />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/position"
          element={
            <Login>
              <Position />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/roles"
          element={
            <Login>
              <Roles />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/source"
          element={
            <Login>
              <Source />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/company-type"
          element={
            <Login>
              <CompanyType />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/deal-stage"
          element={
            <Login>
              <DealsCategory />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/category-expanse"
          element={
            <Login>
              <CategoryExpanse />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/menu-management"
          element={
            <Login>
              <OtorisasiMenu />
            </Login>
          }
        />
        <Route
          exact
          path="/properties/user-access-menu"
          element={
            <Login>
              <UserAccessMenu />
            </Login>
          }
        />
        <Route
          exact
          path="/access-menu/:uid/detail"
          element={
            <Login>
              <DetailAccessMenu />
            </Login>
          }
        />
        <Route
          exact
          path="/account-profile"
          element={
            <Login>
              <AccountProfil />
            </Login>
          }
        />
        <Route
          exact
          path="/task/:uid/edit"
          element={
            <Login>
              <EditTaskFix />
            </Login>
          }
        />
        <Route
          exact
          path="/deals-second"
          element={
            <Login>
              <SecondDeals />
            </Login>
          }
        />
        <Route
          exact
          path="/create-deals"
          element={
            <Login>
              <CreateSecondDeals />
            </Login>
          }
        />
        <Route
          exact
          path="/deals-second/need-approval"
          element={
            <Login>
              <NeedApprovalSecondDeals />
            </Login>
          }
        />
        <Route exact path="/task/weekly-planning-form" element={<Login><WeeklyPlanningForm /></Login>} />
        <Route exact path="/task/weekly-planning-preview" element={<Login><WeeklyPlanningPreview /></Login>} />
        <Route exact path="/task/weekly-planning-report" element={<Login><WeeklyPlanningReportMockup /></Login>} />
        <Route exact path="/task/weekly-planning-system" element={<Login><WeeklyPlanningSystem /></Login>} />
        <Route exact path="/task/weekly-planning-test" element={<Login><WeeklyPlanningTestPage /></Login>} />

        <Route exact path="/properties/deals-version" element={<Login><DealsVersion /></Login>} />
        <Route exact path="/deals-second/:uid/edit" element={<Login><EditDataSecondDeals /></Login>} />
        <Route exact path="/deals-second/assign-deals" element={<Login><AssignDealsSales /></Login>} />
        <Route exact path="/sales-ambasador" element={<Login><SalesAmbasador /></Login>} />
        <Route exact path="/weekly-task" element={<Login><WeeklyTask /></Login>} />
        <Route exact path="/weekly-report" element={<Login><WeeklyReport /></Login>} />
        <Route exact path="/weekly-task/create" element={<Login><CreateWeeklyTask /></Login>} />
        <Route exact path="/weekly-task/:uid/edit" element={<Login><EditTaskWeekly /></Login>} />
        <Route exact path="/weekly-task/:uid/note" element={<Login><FillTaskWeekly /></Login>} />
        <Route exact path="/task/weekly-planning-simulation" element={<Login><WeeklyPlanningSimulation /></Login>} />
        {/* activity technician */}
        <Route exact path="/activity-technician" element={<Login><ActivityTechnician /></Login>} />
        <Route exact path="/activity-technician/:uid/detail" element={<Login><DetailActivity /></Login>} />
        <Route exact path="/activity-technician/create" element={<Login><CreateTechnicianTicket /></Login>} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;

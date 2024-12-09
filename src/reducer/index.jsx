import { combineReducers } from "@reduxjs/toolkit";
import FormCompany from "./company/FormSelectCompany";
import SelectOwner from "./Owner/FormOwner";
import SelectContact from "./contact/FormContactSelect";
import DataDeals from "./dealsV2/DataDeals";
import NeedApprovalManager from "./dealsV2/DataNeedApprovalManager";
import NeedApprovalAccounting from "./dealsV2/DataNeedApprovalAccounting";
import DataStage from "./dealsV2/DealStage";
import DataSideBar from "./Properties/Sidebar";
import DataFaskes from "./Properties/Faskes";
import BpjsRegional from "./Properties/RegionalBpjs";
import CategoryType from "./Properties/CategoryType";
import DataActivityDeals from "./dealsV2/Activity";
import DataSelectDealsV2 from "./dealsV2/SelectDeals";
import DataPks from "./dealsV2/DataPks";
import SelectAmbasador from "./Owner/Ambasador";
import DataDealsAmbasador from "./dealsV2/DataAmbasador";
import GetTypeHospital from "./Properties/TypeHospital";
import DataWeeklyTask from "./dealsV2/DataWeeklyPlanTask";
import DetailWeeklyTask from "./dealsV2/DetailWeeklyPlan";
import DataSelectWeek from "./dealsV2/DataSelectWeekTask";

export default combineReducers({
    FormCompany,
    SelectOwner,
    SelectContact,
    DataDeals,
    NeedApprovalManager,
    NeedApprovalAccounting,
    DataStage,
    DataSideBar,
    DataFaskes,
    BpjsRegional,
    CategoryType,
    DataActivityDeals,
    DataSelectDealsV2,
    DataPks,
    SelectAmbasador,
    DataDealsAmbasador,
    GetTypeHospital,
    DataWeeklyTask,
    DetailWeeklyTask,
    DataSelectWeek
});

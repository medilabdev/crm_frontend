import { combineReducers } from "@reduxjs/toolkit";
import FormCompany from "./company/FormSelectCompany";
import SelectOwner from "./Owner/FormOwner";
import SelectContact from "./contact/FormContactSelect";
import DataDeals from "./dealsV2/DataDeals";
import NeedApprovalManager from "./dealsV2/DataNeedApprovalManager";
import NeedApprovalAccounting from "./dealsV2/DataNeedApprovalAccounting";

export default combineReducers({
    FormCompany,
    SelectOwner,
    SelectContact,
    DataDeals,
    NeedApprovalManager,
    NeedApprovalAccounting,
});

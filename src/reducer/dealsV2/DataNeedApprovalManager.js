import { GET_LIST_NEED_APPROVAL_MANAGER } from "../../action/DataNeedApprovalManager";

const initialstate = {
    ResultNeedManager: false,
    LoadingNeedManager:false,
    ErrorNeedManager:false,
    totalDataManager:false
}

const NeedApprovalManager = (state = initialstate, action) => {
    switch (action.type) {
        case GET_LIST_NEED_APPROVAL_MANAGER:
        return {
            ...state, 
            ResultNeedManager: action.payload.data,
            LoadingNeedManager: action.payload.loading,
            ErrorNeedManager: action.payload.errorMessage,
            totalDataManager:action.payload.totalData
        }
        default:
            return state
    }
}

export default NeedApprovalManager
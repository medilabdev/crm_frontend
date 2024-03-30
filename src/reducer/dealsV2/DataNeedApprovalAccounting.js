import { GET_LIST_NEED_APPROVAL_ACCOUNTING } from "../../action/DataNeedApprovalAccounting";

const initialstate = {
    ResultNeedAccounting: false,
    LoadingNeedAccounting:false,
    ErrorNeedAccounting:false
}

const NeedApprovalAccounting = (state = initialstate, action) => {
    switch (action.type) {
        case GET_LIST_NEED_APPROVAL_ACCOUNTING:
          return {
            ...state,
            ResultNeedAccounting:action.payload.data,
            LoadingNeedAccounting: action.payload.loading,
            ErrorNeedAccounting: action.payload.errorMessage
          }
        default:
           return state
    }
}
export default NeedApprovalAccounting
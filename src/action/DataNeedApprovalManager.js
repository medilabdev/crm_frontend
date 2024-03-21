import axios from "axios";

export const GET_LIST_NEED_APPROVAL_MANAGER = "GET_LIST_NEED_APPROVAL_MANAGER"

export const GetListNeedApprovalManager = (token) => {
    return (dispatch) => {
        dispatch({
            type: GET_LIST_NEED_APPROVAL_MANAGER,
            payload:{
                loading: true,
        data: false,
        errorMessage: false,
            }
        })
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/deals/approval/manager`, {
          headers:{
            Authorization: `Bearer ${token}`,
          }  
        })
        .then((response) => {
            dispatch({
                type:GET_LIST_NEED_APPROVAL_MANAGER,
                data:response.data.data,
                errorMessage:false
            })
        })
        .catch((error) => {
            dispatch({
                type:GET_LIST_NEED_APPROVAL_MANAGER,
                payload:{
                    loading:false,
                    data:error.message,
                    errorMessage:false
                }
            })
        })
    }
}
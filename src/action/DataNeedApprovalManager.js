import axios from "axios";

export const GET_LIST_NEED_APPROVAL_MANAGER = "GET_LIST_NEED_APPROVAL_MANAGER";

export const GetListNeedApprovalManager = (token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_LIST_NEED_APPROVAL_MANAGER,
      payload: {
        loading: false,
        data: false,
        errorMessage: false,
      },
    });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/approval/manager`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.data);
      dispatch({
        type: GET_LIST_NEED_APPROVAL_MANAGER,
        payload:{
          loading: false,
          data: response.data.data,
          errorMessage: false,
        }
       
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_NEED_APPROVAL_MANAGER,
        payload: {
          loading: false,
          data: error.message,
          errorMessage: false,
        },
      });
    }
  };
};

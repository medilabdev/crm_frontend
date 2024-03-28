import axios from "axios";

export const GET_LIST_NEED_APPROVAL_MANAGER = "GET_LIST_NEED_APPROVAL_MANAGER";

export const GetListNeedApprovalManager = (token, pagination, term) => {
  return async (dispatch) => {
    dispatch({
      type: GET_LIST_NEED_APPROVAL_MANAGER,
      payload: {
        loading: false,
        data: false,
        errorMessage: false,
        totalData: false,
      },
    });
    const params = {}
    if(term){
      params.search = term
    }
    params.page = pagination.page;
    params.limit = pagination.limit;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/approval/manager`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        }
      );
      dispatch({
        type: GET_LIST_NEED_APPROVAL_MANAGER,
        payload: {
          loading: false,
          data: response.data.data,
          errorMessage: false,
          totalData:response.data.pagination.totalData
        },
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_NEED_APPROVAL_MANAGER,
        payload: {
          loading: false,
          data: error.message,
          errorMessage: false,
          totalData: false,
        },
      });
    }
  };
};

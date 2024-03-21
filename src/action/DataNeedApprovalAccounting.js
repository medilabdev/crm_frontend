import axios from "axios";

export const GET_LIST_NEED_APPROVAL_ACCOUNTING =
  "GET_LIST_NEED_APPROVAL_ACCOUNTING";

export const GetListNeedApprovalAccounting = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_NEED_APPROVAL_ACCOUNTING,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/v2/deals/approval/finance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_LIST_NEED_APPROVAL_ACCOUNTING,
          data: response.data.data,
          errorMessage: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_NEED_APPROVAL_ACCOUNTING,
          payload: {
            loading: false,
            data: error.message,
            errorMessage: false,
          },
        });
      });
  };
};

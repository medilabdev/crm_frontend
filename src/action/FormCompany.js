import axios from "axios";
export const GET_LIST_COMPANY = "GET_LIST_COMPANY";

export const getListCompany = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_COMPANY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/form/select`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: GET_LIST_COMPANY,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_LIST_COMPANY,
          payload: {
            loading: false,
            data: error.message,
            errorMessage: false,
          },
        });
      });
  };
};

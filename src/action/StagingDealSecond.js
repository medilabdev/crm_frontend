import axios from "axios";

export const GET_STAGING_DEALS = "GET_STAGING_DEALS";

export const GetStaging = (token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_STAGING_DEALS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/staging-masters`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: GET_STAGING_DEALS,
        payload: {
          loading: true,
          data: response.data.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_STAGING_DEALS,
        payload: {
          loading: true,
          data: false,
          errorMessage: error.message || "Failed",
        },
      });
    }
  };
};

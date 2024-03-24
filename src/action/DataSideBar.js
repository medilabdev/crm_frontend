import axios from "axios";

export const GET_DATA_SIDEBAR = "GET_DATA_SIDEBAR";

export const GetDataSidebar = (role, token) => {
  return async (dispatch) => {
    dispatch({
      type: GET_DATA_SIDEBAR,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user-access-menus/role/${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: GET_DATA_SIDEBAR,
        payload: {
          loading: true,
          data: response.data.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_DATA_SIDEBAR,
        payload: {
          loading: true,
          data: false,
          errorMessage: error.message || "Failed",
        },
      });
    }
  };
};

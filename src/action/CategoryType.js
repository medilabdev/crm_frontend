import axios from "axios";
export const GET_CATEGORY_TYPE = "GET_CATEGORY_TYPE"

export const CategoryType = (token) => {
    return (dispatch) =>{
        dispatch({
            type: GET_CATEGORY_TYPE,
            payload: {
              loading: true,
              data: false,
              errorMessage: false,
            },
          });
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/category-type`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            dispatch({
              type: GET_CATEGORY_TYPE,
              payload: {
                loading: false,
                data: response.data.data,
                errorMessage: false,
              },
            });
          })
          .catch((error) => {
            dispatch({
              type: GET_CATEGORY_TYPE,
              payload: {
                loading: false,
                data: error.message,
                errorMessage: false,
              },
            });
          });
    }
}
import axios from "axios";
export const GET_LIST_FASKES = "GET_LIST_FASKES"

export const GetDataFaskes = (token) => {
    return (dispatch) =>{
        dispatch({
            type: GET_LIST_FASKES,
            payload: {
              loading: true,
              data: false,
              errorMessage: false,
            },
          });
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/faskes`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            dispatch({
              type: GET_LIST_FASKES,
              payload: {
                loading: false,
                data: response.data.data,
                errorMessage: false,
              },
            });
          })
          .catch((error) => {
            dispatch({
              type: GET_LIST_FASKES,
              payload: {
                loading: false,
                data: error.message,
                errorMessage: false,
              },
            });
          });
    }
}
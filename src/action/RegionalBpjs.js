import axios from "axios";
export const GET_BPJS = "GET_BPJS"

export const GetDataRegionalBpjs = (token) => {
    return (dispatch) =>{
        dispatch({
            type: GET_BPJS,
            payload: {
              loading: true,
              data: false,
              errorMessage: false,
            },
          });
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/bpjs-regional`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            dispatch({
              type: GET_BPJS,
              payload: {
                loading: false,
                data: response.data.data,
                errorMessage: false,
              },
            });
          })
          .catch((error) => {
            dispatch({
              type: GET_BPJS,
              payload: {
                loading: false,
                data: error.message,
                errorMessage: false,
              },
            });
          });
    }
}
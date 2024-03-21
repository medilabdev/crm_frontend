import axios from "axios";
export const GET_LIST_CONTACT = "GET_LIST_CONTACT"

export const getListContact = (token) => {
    return (dispatch) =>{
        dispatch({
            type: GET_LIST_CONTACT,
            payload: {
              loading: true,
              data: false,
              errorMessage: false,
            },
          });
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/contacts/form/select`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            dispatch({
              type: GET_LIST_CONTACT,
              payload: {
                loading: false,
                data: response.data.data,
                errorMessage: false,
              },
            });
          })
          .catch((error) => {
            dispatch({
              type: GET_LIST_CONTACT,
              payload: {
                loading: false,
                data: error.message,
                errorMessage: false,
              },
            });
          });
    }
}
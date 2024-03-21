import axios from "axios";
export const GET_LIST_OWNER = "GET_LIST_OWNER"

export const getListOwner = (token) =>{
    return (dispatch) => {
        dispatch({
            type:GET_LIST_OWNER,
            payload:{
                loading:true,
                data:false,
                errorMessage:false
            }
        });
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response) =>{
            dispatch({
            type:GET_LIST_OWNER,
            payload:{
                loading:true,
                data:response.data.data,
                errorMessage:false
            }
            })
        })
        .catch((error) => {
            dispatch({
                type:GET_LIST_OWNER,
                payload:{
                    loading:true,
                    data:error.message,
                    errorMessage:false
                }
            })
        })
    }
}
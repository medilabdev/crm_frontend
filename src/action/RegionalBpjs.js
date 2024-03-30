import axios from "axios";
export const GET_BPJS = "GET_BPJS"

export const GetDataRegionalBpjs = (token, retryCount = 0) => {
    return async (dispatch) =>{
        dispatch({
            type: GET_BPJS,
            payload: {
              loading: true,
              data: false,
              errorMessage: false,
            },
          });
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/bpjs-regional`,{
              headers:{
                  Authorization: `Bearer ${token}`
              }
            })
            dispatch({
              type: GET_BPJS,
              payload: {
                loading: false,
                data: response.data.data,
                errorMessage: false,
              },
            });
          } catch (error) {
            if (error.response) {
              if (error.response.status === 401 &&
                error.response.data.message === "Unauthenticated.") {
                localStorage.clear();
                window.location.href = "/login";
              } else if (error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                  setTimeout(() => {
                    dispatch(GetDataRegionalBpjs(token, retryCount + 1));
                  }, 2000);
                } else {
                  console.error(
                    "Max retry attempts reached. Unable to complete the request."
                  );
                }
              } else {
                console.error("Unhandled error:", error);
              }
            } else {
              console.error("Network error:", error);
            }
            dispatch({
              type: GET_BPJS,
              payload: {
                loading: false,
                data: error.message,
                errorMessage: false,
              },
            });
          }
    }
}
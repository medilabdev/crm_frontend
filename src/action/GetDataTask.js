import axios from "axios";
export const GET_DATA_WEEKLYPLAN_TASK = "GET_DATA_WEEKLYPLAN_TASK"
export const GET_DATA_WEEKLYPLAN_DETAIL_TASK = "GET_DATA_WEEKLYPLAN_DETAIL_TASK";

export const GetDataWeeklyPlanTask = (token, search, pagination, retryCount = 0) => {
    return async (dispatch) =>{
        dispatch({
            type: GET_DATA_WEEKLYPLAN_TASK,
            payload: {
              loading: true,
              data: false,
              errorMessage: false,
            },
          });
          const params = {}
          if(search){
            params.search = search
          }
          params.page = pagination.page;
          params.limit = pagination.limit
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/tasks`,{
              headers:{
                  Authorization: `Bearer ${token}`
              },
              params: params
            })
            dispatch({
              type: GET_DATA_WEEKLYPLAN_TASK,
              payload: {
                loading: false,
                data: response.data.data,
                errorMessage: false,
              },
            });
          } catch (error) {
            console.log(error);
            
            if (error.response) {
              if (error.response.status === 401 &&
                error.response.data.message === "Unauthenticated.") {
                localStorage.clear();
                window.location.href = "/login";
              } else if (error.response.status === 429) {
                const maxRetries = 3;
                if (retryCount < maxRetries) {
                  setTimeout(() => {
                    dispatch(GetDataWeeklyPlanTask(token, retryCount + 1));
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
              type: GET_DATA_WEEKLYPLAN_TASK,
              payload: {
                loading: false,
                data: error.message,
                errorMessage: false,
              },
            });
          }
    }
}

export const GetDetailWeeklyPlanTask = (token, uid, retryCount = 0) => {
  return async (dispatch) => {
      dispatch({
        type: GET_DATA_WEEKLYPLAN_DETAIL_TASK,
        payload: {
          loading: true,
          data: false,
          errorMessage: false,
        },
      });
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/v2/tasks/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch({
          type: GET_DATA_WEEKLYPLAN_DETAIL_TASK,
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
                dispatch(GetDetailWeeklyPlanTask(token, retryCount + 1));
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
          type: GET_DATA_WEEKLYPLAN_DETAIL_TASK,
          payload: {
            loading: false,
            data: error.message,
            errorMessage: false,
          },
        });
      }
    };
}
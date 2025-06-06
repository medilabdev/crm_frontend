import axios, { Axios } from "axios";
import { token } from "../view/SecondDeals/partials/ColumnsTable";
// import { useState } from "react";
export const GET_DATA_DEALS = "GET_DATA_DEALS";
export const GET_DATA_DEALS_DETAIL = "GET_DATA_DEALS_DETAIL";
export const GET_DATA_ACTIVITY = "GET_DATA_ACTIVITY";
export const GET_DATA_SELECT_DEALS = "GET_SELECT_DATA_DEALS";
export const GetDataDeals = (
  token,
  term,
  ownerDeals,
  formSearch,
  pagination,
  retryCount = 0
) => {
  return async (dispatch) => {
    dispatch({
      type: GET_DATA_DEALS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
        totalRows: false,
      },
    });
    const params = {};
    if (term) {
      params.search = term;
    }
    if (formSearch) {
      Object.assign(params, formSearch);
      if (!params.page) {
        params.page = pagination.page;
      }
      if (!params.limit) {
        params.limit = pagination.limit;
      }
    }
    if (ownerDeals) {
      params.deals = ownerDeals;
      params.page = pagination.page;
      params.limit = pagination.limit;
    }
    params.page = pagination.page;
    params.limit = pagination.limit;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        }
      );
      dispatch({
        type: GET_DATA_DEALS,
        payload: {
          loading: false,
          data: response.data.data,
          errorMessage: false,
          totalRows: response.data.pagination.totalData,
        },
      });
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthenticated."
        ) {
          localStorage.clear();
          window.location.href = "/login";
        } else if (error.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              dispatch(
                GetDataDeals(
                  token,
                  term,
                  ownerDeals,
                  formSearch,
                  pagination,
                  retryCount + 1
                )
              );
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
        type: GET_DATA_DEALS,
        payload: {
          loading: false,
          data: error.message,
          errorMessage: false,
          totalRows: false,
        },
      });
    }
  };
};

export const GetDataDealsDetail = (uid, token, retryCount = 0) => {
  return async (dispatch) => {
    dispatch({
      type: GET_DATA_DEALS_DETAIL,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: GET_DATA_DEALS_DETAIL,
        payload: {
          loading: true,
          data: response.data.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthenticated."
        ) {
          localStorage.clear();
          window.location.href = "/login";
        } else if (error.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              dispatch(GetDataDealsDetail(uid, token, retryCount + 1));
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
        type: GET_DATA_DEALS_DETAIL,
        payload: {
          loading: true,
          data: false,
          errorMessage: error.message || "Failed",
        },
      });
    }
  };
};

export const GetDataActivity = (uid, token, retryCount = 0) => {
  
  return async (dispatch) => {
    dispatch({
      type: GET_DATA_ACTIVITY,
      payload:{
        loading:true,
        data:false,
        errorMessage:false,
      }
    })
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/v2/activities/${uid}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      dispatch({
        type:GET_DATA_ACTIVITY,
        payload:{
          loading:true,
          data:response?.data?.data,
          errorMessage:false
        }
      })
    } catch (error) {
      if(error.response){
        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthenticated."
        ) {
          localStorage.clear();
          window.location.href = "/login";
        } else if (error.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              dispatch(GetDataActivity(uid, token, retryCount + 1));
            }, 2000);
          } else {
            console.error(
              "Max retry attempts reached. Unable to complete the request."
            );
          }
        } else {
          console.error("Unhandled error:", error);
        }
      }else{
        console.error("Network Error:", error);
      }
    }
  }
}

export const GetDataSelectDeals = (token, retryCount = 0) => {
  
  return async (dispatch) => {
    dispatch({
      type: GET_DATA_SELECT_DEALS,
      payload:{
        loading:true,
        data:false,
        errorMessage:false,
      }
    })
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/v2/deals/select/option`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      dispatch({
        type:GET_DATA_SELECT_DEALS,
        payload:{
          loading:true,
          data:response?.data?.data,
          errorMessage:false
        }
      })
    } catch (error) {
      if(error.response){
        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthenticated."
        ) {
          localStorage.clear();
          window.location.href = "/login";
        } else if (error.response.status === 429) {
          const maxRetries = 3;
          if (retryCount < maxRetries) {
            setTimeout(() => {
              dispatch(GetDataSelectDeals(token, retryCount + 1));
            }, 2000);
          } else {
            console.error(
              "Max retry attempts reached. Unable to complete the request."
            );
          }
        } else {
          console.error("Unhandled error:", error);
        }
      }else{
        console.error("Network Error:", error);
      }
    }
  }
}



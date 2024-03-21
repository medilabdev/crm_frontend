import axios, { Axios } from "axios";
// import { useState } from "react";
export const GET_DATA_DEALS = "GET_DATA_DEALS";

export const GetDataDeals = (
  token,
  term,
  ownerDeals,
  formSearch,
  pagination
) => {
  return (dispatch) => {
    dispatch({
      type: GET_DATA_DEALS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
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
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/v2/deals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      })
      .then((response) => {
        dispatch({
          type: GET_DATA_DEALS,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_DATA_DEALS,
          payload: {
            loading: false,
            data: error.message,
            errorMessage: false,
          },
        });
      });
  };
};



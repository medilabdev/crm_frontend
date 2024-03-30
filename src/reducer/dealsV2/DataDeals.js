import { GET_DATA_DEALS, GET_DATA_DEALS_DETAIL } from "../../action/DataDeals";

const initialstate = {
  listResultDataDeals: false,
  listLoadingDataDeals: false,
  listErrorDataDeals: false,
  totalDataDeals: false,

  detailDataDeals: false,
  loadingDataDeals: false,
  errorDataDeals: false,
};

const DataDeals = (state = initialstate, action) => {
  switch (action.type) {
    case GET_DATA_DEALS:
      return {
        ...state,
        listResultDataDeals: action.payload.data,
        listLoadingDataDeals: true,
        listErrorDataDeals: action.payload.errorMessage,
        totalDataDeals: action.payload.totalRows,
      };
    case GET_DATA_DEALS_DETAIL:
      return {
        ...state,
        detailDataDeals: action.payload.data,
        loadingDataDeals: true,
        errorDataDeals: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default DataDeals;

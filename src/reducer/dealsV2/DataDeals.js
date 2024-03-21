import { GET_DATA_DEALS } from "../../action/DataDeals";

const initialstate = {
  listResultDataDeals: false,
  listLoadingDataDeals: false,
  listErrorDataDeals: false,
};

const DataDeals = (state = initialstate, action) => {
  switch (action.type) {
    case GET_DATA_DEALS:
      return {
        ...state,
        listResultDataDeals: action.payload.data,
        listLoadingDataDeals: action.payload.loading,
        listErrorDataDeals: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default DataDeals

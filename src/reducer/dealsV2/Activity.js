import { GET_DATA_ACTIVITY } from "../../action/DataDeals";

const initialstate = {
    dataActivityDeals: false,
    loadingDataActivity: false,
    errorDataActivity: false,
  };
  
const DataActivityDeals = (state = initialstate, action) => {
    switch(action.type){
      case GET_DATA_ACTIVITY:
        return{
          ...state,
          dataActivityDeals:action.payload.data,
          loadingDataActivity:true,
          errorDataActivity: action.payload.errorMessage,
        };
        default:
          return state
    }
  }
export default DataActivityDeals;
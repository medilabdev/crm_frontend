import { GET_DATA_SELECT_DEALS } from "../../action/DataDeals";

const initialstate = {
    listResultDataSelectDeals: false,
    listLoadingDataSelectDeals: false,
    listErrorDataSelectDeasl: false
}

const DataSelectDealsV2 = (state = initialstate, action) => {
    switch(action.type){
        case GET_DATA_SELECT_DEALS:
            return{
                ...state,
                listResultDataSelectDeals: action.payload.data,
                listLoadingDataSelectDeals: true,
                listErrorDataSelectDeasl: action.payload.errorMessage,
            };
            default:
                return state
    }
}
export default DataSelectDealsV2;
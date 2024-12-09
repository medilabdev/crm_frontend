import { GET_DATA_SELECT_WEEK } from "../../action/SelectWeekTask";

const initialstate ={
    dataOptionSelectWeek: false,
    loadingSelectWeek: false,
    errorSelectWeek: false,
}

const DataSelectWeek = (state = initialstate, action) => {
    switch(action.type){
        case GET_DATA_SELECT_WEEK:
                return{
                    ...state,
                    dataOptionSelectWeek:action.payload.data,
                    loadingSelectWeek:true,
                    errorSelectWeek: action.payload.errorMessage
                };
                default:
                    return state
    }
}
export default DataSelectWeek;
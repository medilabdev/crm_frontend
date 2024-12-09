import { GET_DATA_WEEKLYPLAN_TASK } from "../../action/GetDataTask";


const initialstate = {
    dataWeekly:false,
    loadingWeekly: false,
    errorWeekly: false
}

const DataWeeklyTask = (state = initialstate, action) => {
    switch(action.type){
        case GET_DATA_WEEKLYPLAN_TASK:
            return{
                ...state, 
                dataWeekly:action.payload.data,
                loadingWeekly: true,
                errorWeekly: action.payload.errorMessage
            };
            default:
                return state
    }   
}

export default DataWeeklyTask;
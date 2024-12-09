import { GET_DATA_WEEKLYPLAN_DETAIL_TASK } from "../../action/GetDataTask";


const initialstate = {
    detailWeekly:false,
    detailloadingWeekly: false,
    detailerrorWeekly: false
}

const DetailWeeklyTask = (state = initialstate, action) => {
    switch(action.type){
        case GET_DATA_WEEKLYPLAN_DETAIL_TASK:
            return{
                ...state, 
                detailWeekly:action.payload.data || {},
                detailloadingWeekly: true,
                detailerrorWeekly: action.payload.errorMessage
            };
            default:
                return state
    }   
}

export default DetailWeeklyTask;
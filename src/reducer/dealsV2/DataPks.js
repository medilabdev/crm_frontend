import { GET_PKS } from "../../action/GetPks";

const initialstate = {
    dataPks:false,
    loadingPks: false,
    errorPks: false
}

const DataPks = (state = initialstate, action) => {
    switch(action.type){
        case GET_PKS:
            return{
                ...state, 
                dataPks:action.payload.data,
                loadingPks: true,
                errorPks: action.payload.errorMessage
            };
            default:
                return state
    }   
}

export default DataPks;
import { GET_LIST_AMBASADOR } from "../../action/GetAmbasadorUser";

const initialstate = {
    dataAmbasador : false,
    dataLoading : false,
    dataError : false,
}

const SelectAmbasador = (state = initialstate, action) => {
    switch(action.type){
        case GET_LIST_AMBASADOR:
            return{
                ...state,
                dataAmbasador:action.payload.data,
                dataLoading:action.payload.loading,
                dataError:action.payload.errorMessage
            }
            default:
                return state
    }
}
export default SelectAmbasador;
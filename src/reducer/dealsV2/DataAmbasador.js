import { GET_DATA_DEALS_AMBASADOR } from "../../action/GetDataAmbasador";

const initialstate = {
    listDataAmbasador: false,
    listLoadingAmbasador: false,
    listErrorAmbasador:false
}

const DataDealsAmbasador = (state = initialstate, action) => {
    switch (action.type){
        case GET_DATA_DEALS_AMBASADOR:
            return {
                ...state,
                listDataAmbasador: action.payload.data,
                listLoadingAmbasador:true,
                listErrorAmbasador: action.payload.errorMessage
            }
        default:
            return state;
    }
}
export default DataDealsAmbasador;
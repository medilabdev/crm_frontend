import { GET_LIST_FASKES } from "../../action/DataFaskes";

const initialstate = {
    fasksesData:false,
    fasksesLoading:false,
    fasksesError:false
}

const DataFaskes = (state = initialstate, action) => {
    switch (action.type) {
        case GET_LIST_FASKES:
            return{
                ...state,
                fasksesData:action.payload.data,
                fasksesLoading:action.payload.loading,
                fasksesError:action.payload.errorMessage
            }
        default:
            return state
    }
}

export default DataFaskes
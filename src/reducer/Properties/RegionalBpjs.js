import { GET_BPJS } from "../../action/RegionalBpjs"
const initialstate = {
    BpjsData:false,
    BpjsLoading:false,
    BpjsError:false
}

const BpjsRegional = (state = initialstate, action) => {
    switch (action.type) {
        case GET_BPJS:
            return{
                ...state,
                BpjsData:action.payload.data,
                BpjsLoading:action.payload.loading,
                BpjsError:action.payload.errorMessage
            }
        default:
            return state
    }
}

export default BpjsRegional
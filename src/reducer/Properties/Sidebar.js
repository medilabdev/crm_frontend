import { GET_DATA_SIDEBAR } from "../../action/DataSideBar";

const initialstate = {
    sidebarData:false,
    sidebarLoading:false,
    sidebarError:false
}

const DataSideBar = (state = initialstate, action) => {
    switch (action.type) {
        case GET_DATA_SIDEBAR:
            return{
                ...state,
                sidebarData:action.payload.data,
                sidebarLoading:action.payload.loading,
                sidebarError:action.payload.errorMessage
            }
        default:
            return state
    }
}

export default DataSideBar
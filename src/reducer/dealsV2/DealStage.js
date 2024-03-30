import { GET_STAGING_DEALS } from "../../action/StagingDealSecond";

const initialstate = {
    ResultStageDeals : false,
    LoadingStageDeals :false,
    ErrorStageDeals: false
}

const DataStage = (state = initialstate, action) => {
    switch (action.type) {
        case GET_STAGING_DEALS:
            return {
                ...state,
                ResultStageDeals:action.payload.data,
                LoadingStageDeals:action.payload.loading,
                ErrorStageDeals:action.payload.errorMessage
            }
        default:
            return state
    }
}

export default DataStage
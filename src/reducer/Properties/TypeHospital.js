import { GET_DATA_TYPE_HOSPITAL } from "../../action/TypeHospital"

const initialstate = {
    DataTypeHospital : false,
    DataTypeHospitalLoading : false,
    DataTypeHospitalError: false,
}


const GetTypeHospital = (state = initialstate, action) => {
    switch(action.type){
        case GET_DATA_TYPE_HOSPITAL:
            return{
                ...state,
                DataTypeHospital:action.payload.data,
                DataTypeHospitalLoading:action.payload.loading,
                DataTypeHospitalError:action.payload.errorMessage
            }
            default : 
            return state
    }
}

export default GetTypeHospital
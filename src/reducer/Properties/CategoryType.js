import { GET_CATEGORY_TYPE } from "../../action/CategoryType"

const initialstate = {
    CategoryTypeData:false,
    CategoryTypeLoading:false,
    CategoryTypeError:false
}

const CategoryType = (state = initialstate, action) => {
    switch (action.type) {
        case GET_CATEGORY_TYPE:
            return{
                ...state,
                CategoryTypeData:action.payload.data,
                CategoryTypeLoading:action.payload.loading,
                CategoryTypeError:action.payload.errorMessage
            }
        default:
            return state
    }
}

export default CategoryType
import { GET_LIST_OWNER } from "../../action/FormOwner";

const initialstate = {
    listResultOwner: false,
    listLoadingOwner: false,
    listErrorOwner: false,
  };
  
  const SelectOwner = (state = initialstate, action) => {
    switch (action.type) {
        case GET_LIST_OWNER:
          return{
            ...state,
            listResultOwner:action.payload.data,
            listLoadingOwner:action.payload.loading,
            listErrorOwner:action.payload.errorMessage
          }  
        default:
            return state
    }
  }

  export default SelectOwner
import { GET_LIST_CONTACT } from "../../action/FormContact";

const initialstate = {
    listResultContact: false,
    listLoadingContact: false,
    listErrorContact: false,
  };

  const SelectContact = (state = initialstate, action) =>{
    switch (action.type) {
        case GET_LIST_CONTACT:
           return {
            listResultContact: action.payload.data,
            listLoadingContact: action.payload.loading,
            listErrorContact: action.payload.errorMessage
           }
        default:
           return state
    }
  }

  export default SelectContact
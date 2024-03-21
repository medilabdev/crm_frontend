import { GET_LIST_COMPANY } from "../../action/FormCompany";

const initialstate = {
  listResult: false,
  listLoading: false,
  listError: false,
};

const SelectCompany = (state = initialstate, action) => {
  switch (action.type) {
    case GET_LIST_COMPANY:
      return {
        ...state,
        listResult: action.payload.data,
        listLoading: action.payload.loading,
        listError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default SelectCompany;

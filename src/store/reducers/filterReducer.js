const initialState = {
  isChild: false,
  category: "ALL"
};

const filterReducer = (state = initialState, action) => {
  switch (action?.type) {
    case 'FILTER/UPDATE_CHILD':
      return {
        ...state,
        isChild: action.payload
      };
    case 'FILTER/UPDATE_CATEGORY':
      return {
        ...state,
        category: action.payload
      };
    default:
      return state;
  }

};

export default filterReducer;

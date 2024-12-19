import {categories, data} from "../../data/data";

import {getCategoryData, getChildData} from "../services";

const initialState = {
  data: data,
  categories: categories
};

const touristReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        data: action
      };
    case 'GET_CHILD_INFO':
      return getChildData(state.data)
    case 'GET_CATEGORY_DATA':
      return getCategoryData(state.data)
    default:
      return state;
  }
};

export default touristReducer;

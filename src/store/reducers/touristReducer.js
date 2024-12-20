import {categories, data} from "../../data/data";

import {getCategoryData, getChildData} from "../services";

const initialState = {
    data: data,
    categories: categories,
    chartData: null
};

const touristReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOURIST/GET_CHILD_INFO':
            return {
                ...state,
                chartData: getChildData(state.data)
            };
        case 'TOURIST/GET_CATEGORY_DATA':
            return {
                ...state,
                chartData: getCategoryData(state.data, action.payload, state.categories)
            };
        default:
            return state;
    }
};

export default touristReducer;

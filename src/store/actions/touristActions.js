export const getChildInfo = () => ({
    type: 'TOURIST/GET_CHILD_INFO'
});

export const getCategoryData = (category) => ({
    type: 'TOURIST/GET_CATEGORY_DATA',
    payload: category
});

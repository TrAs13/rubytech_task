export const updateChild = (isChild) => ({
    type: 'FILTER/UPDATE_CHILD',
    payload: isChild
});

export const updateCategory = (category) => ({
    type: 'FILTER/UPDATE_CATEGORY',
    payload: category
});

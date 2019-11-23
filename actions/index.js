
export const plus = (count) => async (dispatch) => {
    dispatch({
        type: "INCREMENT",
        payload: count
    });
};

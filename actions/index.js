
export const plus = (count) => async (dispatch) => {
    console.log(count)
    dispatch({
        type: "INCREMENT",
        payload: count
    });
};

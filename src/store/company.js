export const actionType = 'SET_COMPANY';

export const setCompany = name => ({
    type: actionType,
    payload: {
        name
    }
});

const initState = {
    name: null
};

export function company(state = initState, action) {
    if (action.type === actionType) {
        return action.payload
    } else {
        return state
    }
}
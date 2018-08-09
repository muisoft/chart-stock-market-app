import * as ActionType from '../actions/ActionType';

const initialState = {
    stocks: [],
    stock: {},
    iserror: false,
    partialState: {},
    message: {},
    value: ''
}

export const stock = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ON_SUCCESS:
            return {
                ...state,
                stocks: action.payload,
            }
       
        default:
            return state;
    }
}

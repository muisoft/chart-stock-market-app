import * as ActionType from '../actions/ActionType';

const initialState = {
    stocks: [],
    stock: {},
    isloading: true,
    partialState: {},
    message: {},
    value: ''
}

export const stock = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.ON_SUCCESS:
            return {
                ...state,
                isloading: false,
                stocks: action.payload  
            }
        case ActionType.ON_LOADING:
            return {
                ...state,
                isloading: action.payload,
            }

        default:
            return state;
    }
}

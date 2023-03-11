import {CashActions, CashActionTypes, CashState} from "./cash.interface";

const defaultState: CashState = {
    cash: 0,
}

export const cashReducer = (state = defaultState, action: CashActions): CashState => {
    switch (action.type) {
        case CashActionTypes.ADD_CASH:
            return {...state, cash: action.payload + state.cash}
        case CashActionTypes.GET_CASH:
            return {...state, cash: state.cash - action.payload}
        default:
            return state;
    }
}

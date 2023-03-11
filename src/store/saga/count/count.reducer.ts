import {CountActions, CountActionTypes, CountState} from "./count.interface";

const defaultState: CountState = {
    count: 0,
    loading: false,
    error: null
}

export default function countReducer(state = defaultState, action: CountActions): CountState {
    switch (action.type) {
        case CountActionTypes.INCREMENT:
            return {...state, loading: true}
        case CountActionTypes.INCREMENT_SUCCESS:
            return {...state, loading: false, count: state.count + 1}
        case CountActionTypes.INCREMENT_ERROR:
            return {...state, loading: false, error: action.payload}
        case CountActionTypes.DECREMENT:
            return {...state, loading: true}
        case CountActionTypes.DECREMENT_SUCCESS:
            return {...state, loading: false, count: state.count - 1}
        case CountActionTypes.DECREMENT_ERROR:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}
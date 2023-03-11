import {UsersActions, UsersActionTypes, UsersState} from "./users.interface";

const defaultState: UsersState = {
    users: [],
    loading: false,
    error: null
}

export default function userReducer(state = defaultState, action: UsersActions): UsersState {
    switch(action.type) {
        case UsersActionTypes.FETCH_USERS:
            return {...state, loading: true}
        case UsersActionTypes.FETCH_USERS_SUCCESS:
            return {...state, loading: false, users: [...state.users, ...action.payload]}
        case UsersActionTypes.FETCH_USERS_ERROR:
            return {...state, loading: false, error: action.payload}
        case UsersActionTypes.SET_USERS:
            return {...state, users: action.payload}
        default:
            return state
    }
}
export interface User {
    id: number;
    name: string;
}

export interface UsersState {
    users: User[],
    loading: boolean;
    error: null | string
}

export enum UsersActionTypes {
    SET_USERS = "SET_USERS",
    FETCH_USERS_SAGA = "FETCH_USERS_SAGA",
    FETCH_USERS = "FETCH_USERS",
    FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
    FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
}

export interface SetUsersAction {
    type: UsersActionTypes.SET_USERS
    payload: User[]
}

export interface FetchUsersSagaAction {
    type: UsersActionTypes.FETCH_USERS_SAGA
}

export interface FetchUsersAction {
    type: UsersActionTypes.FETCH_USERS
}

export interface FetchUsersSuccessAction {
    type: UsersActionTypes.FETCH_USERS_SUCCESS
    payload: User[]
}

export interface FetchUsersErrorAction {
    type: UsersActionTypes.FETCH_USERS_ERROR
    payload: string
}

export type UsersActions = SetUsersAction | FetchUsersSagaAction | FetchUsersAction | FetchUsersSuccessAction | FetchUsersErrorAction
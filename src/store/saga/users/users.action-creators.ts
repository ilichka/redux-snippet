import {User, UsersActionTypes} from "./users.interface";

export const setUsers = (payload: User[]) => ({type: UsersActionTypes.SET_USERS, payload})
export const fetchUsersSaga = () => ({type: UsersActionTypes.FETCH_USERS_SAGA})
export const fetchUsers = () => ({type: UsersActionTypes.FETCH_USERS})
export const fetchUsersSuccess = (users: User[]) => ({type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: users})
export const fetchUsersError = (error: string) => ({type: UsersActionTypes.FETCH_USERS_ERROR, payload: error})
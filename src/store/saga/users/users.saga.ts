import {put, takeEvery, call, SagaReturnType} from "redux-saga/effects"
import {User, UsersActionTypes} from "./users.interface";
import axios from "axios";
import {fetchUsers, fetchUsersError, fetchUsersSuccess, setUsers} from "./users.action-creators";

const fetchUsersFromApi = () => axios.get<User[]>('https://jsonplaceholder.typicode.com/users?_limit=10')

function* fetchUserWorker() {
    try {
        yield put(fetchUsers())
        const data: SagaReturnType<typeof fetchUsersFromApi> = yield call(fetchUsersFromApi)
        yield put(fetchUsersSuccess(data.data))
    } catch (e) {
        yield put(fetchUsersError('Cannot fetch users'))
    }
}

export function* userWatcher() {
    yield takeEvery(UsersActionTypes.FETCH_USERS_SAGA, fetchUserWorker)
}
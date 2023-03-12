import {put, takeEvery} from "redux-saga/effects"
import {CountActionTypes} from "./count.interface";
import {
    decrement,
    decrementError,
    decrementSuccess,
    increment,
    incrementError,
    incrementSuccess
} from "./count.action-creators";

const delay = (ms: number) => new Promise((res, rej) => {
    setTimeout(()=>res('Resolved'), ms)
})

function* asyncIncrementWorker() {
    try {
        yield put(increment())
        yield delay(1000)
        yield put(incrementSuccess())
    } catch (e) {
        yield put(incrementError('Cannot increment'))
    }
}

function* asyncDecrementWorker() {
    try {
        yield put(decrement())
        yield delay(1000)
        yield put(decrementSuccess())
    } catch (e) {
        yield put(decrementError('Cannot decrement'))
    }
}

export function* countWatcher() {
    yield takeEvery(CountActionTypes.INCREMENT_SAGA, asyncIncrementWorker)
    yield takeEvery(CountActionTypes.DECREMENT_SAGA, asyncDecrementWorker)
}
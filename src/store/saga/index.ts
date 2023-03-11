import {all} from "redux-saga/effects"
import {countWatcher} from "./count";
import {userWatcher} from "./users";

export function* rootWatcher() {
    yield all([countWatcher(), userWatcher()])
}
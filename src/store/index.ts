import {legacy_createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "./saga";
import {customersReducer, CustomersActionCreators} from "./thunk/customers";
import {cashReducer, CashActionCreators} from './thunk/cash'
import countReducer from "./saga/count/count.reducer";
import userReducer from "./saga/users/users.reducer";

const sagaMiddleware = createSagaMiddleware()
const thunkMiddleware = thunk

const rootReducer = combineReducers({
    cash: cashReducer,
    customers: customersReducer,
    count: countReducer,
    users: userReducer
})

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunkMiddleware)))

export type RootState = ReturnType<typeof store.getState>

export default {
    ...CustomersActionCreators,
    ...CashActionCreators
}

sagaMiddleware.run(rootWatcher)
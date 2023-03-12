# Redux snippet.

Redux is a library for working with global state. Simply it is a data storage.

For what purpose we need redux? It solves a problem called props drilling. If we 
have big application, and we need to pass data from one child node to other we will just take the state up.
But, as I mentioned before, we have a big application, so we will have a lot of such kind of data in our
parent component. That how props drilling appears.

![props_vs_redux](public/props_vs_redux.png)

So, all of this data, that we have in our parent component, we move to the redux.

In redux, we have 4 main components:

1. State
2. Actions
3. Reducers
4. Dispatcher(dispatch)

- State is a javascript object, that stores data. Only one source of true. Immutable(always returns new object).

- Action is a javascript object with type of action and any payload. Defines how exactly we can mutate data.

- Reducer is a function, that accepts state and action. By default, returns state. Pure functions.

- Dispatcher or dispatch function accepts action and delivers this action to reducer.

Action &rarr; Dispatch &rarr; Reducer &rarr; State

Some words about files in this snippet. Files in this project are tagged according theirs purpose:

- {name}.reducer.{ext} - reducer is here
- {name}.action-creators.{ext} - action creators are here
- {name}.interface.{ext} - interface of this module is here
- {name}.hook.{ext} - hook is here
- {name}.saga.{ext} - saga components are here
- {name}.component.{ext} - react component is here
- {name}.styles.{ext} - styles of react component are here

All files and folders in this project calls according to **kebab-case**.

In this snippet we will consider `saga` and `thunk`. So in store folder we will have two different folders called `saga` and `thunk`.

To connect our React with Redux we need to add a Provider and pass there a store, created with
**createStore** function.

Let's start from creating reducers: 

```typescript
// ~/src/store/thunk/cash/cash.reducer.ts
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
```

```typescript
// ~/src/store/thunk/customers/customers.reducer.ts
import {CustomersAction, CustomersActionTypes, CustomersState} from "./customers.interface";

const defaultState: CustomersState = {
    customers: [],
    error: null,
    loading: false
}

export const customersReducer = (state = defaultState, action: CustomersAction): CustomersState => {
    switch (action.type) {
        case CustomersActionTypes.FETCH_CUSTOMERS:
            return {...state, loading: true}
        case CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS:
            return {...state,loading: false, customers: [...state.customers, ...action.payload]}
        case CustomersActionTypes.FETCH_CUSTOMERS_ERROR:
            return {...state,loading: false, error: action.payload}
        case CustomersActionTypes.ADD_CUSTOMER:
            return {...state,loading: false, customers: [...state.customers, action.payload]}
        case CustomersActionTypes.REMOVE_CUSTOMER:
            return {...state,loading: false, customers: state.customers.filter((customer)=>customer.id !== action.payload.id)}
        default:
            return state;
    }
}
```
In reducers, it is advised to create action variables and action creator functions.

Create interfaces in `customers.interface.ts` and `cash.interface.ts` files, that describes particular module.

Create actions:
```typescript
// ~/src/store/thunk/customers/customers.action-creators.ts
import {Dispatch} from "redux";
import {Customer, CustomersAction, CustomersActionTypes} from "./customers.interface";

export const addCustomer = (customer: Customer) => ({type: CustomersActionTypes.ADD_CUSTOMER, payload: customer})
export const removeCustomer = (customer: Customer) => ({type: CustomersActionTypes.REMOVE_CUSTOMER, payload: customer})
```

```typescript
// ~/src/store/thunk/cash/cash.action-creators.ts
import {CashActionTypes} from "./cash.interface";

export const addCash = (cashAmount: number) => ({type: CashActionTypes.ADD_CASH, payload: cashAmount})
export const getCash = (cashAmount: number) => ({type: CashActionTypes.GET_CASH, payload: cashAmount})
```

Create store:
```typescript jsx
// ~/src/store/index
import {legacy_createStore, combineReducers} from "redux";
import {cashReducer} from "./cashReducer";
import {customerReducer} from "./customerReducer";

const rootReducer = combineReducers({
    cash: cashReducer,
    customer: customerReducer
})

export const store = legacy_createStore(rootReducer)
```

Wrap our app with Provider:
```typescript jsx
// ~/src/index
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.component';
import {Provider} from "react-redux";
import {store} from "./store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

If you want to use devtools, install redux-devtools extension in chrome 
and run this script to install devtools:
```bash
  $ npm i redux-devtools-extension
```

and then format your store initialization: 
```typescript jsx
// ~/src/store/index
import {composeWithDevTools} from "redux-devtools-extension";

export const store = legacy_createStore(rootReducer, composeWithDevTools())
```

Open your browser and move to devtools, then open tab calls redux:

![redux_devtools](public/redux_devtools.png)

To work with async code in redux we can use `redux-thunk` or `redux-saga` middleware, as I mentioned earlier.

Let's start from thunk. Install redux-thunk with:
```bash
  $ npm i redux-thunk
```

Move to our index file and update our store creation function. To connect middleware
in redux you can use applyMiddleware function:
```typescript jsx
// ~/src/store/index
import thunk from "redux-thunk";
import {applyMiddleware} from "redux";

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
```

In our store folder we created thunk folder to store logic according thunk middleware. Create a
fetchCustomers function:
```typescript jsx
// ~/src/store/thunk/customers/customers.action-creators.ts
import {Dispatch} from "redux";
import {Customer, CustomersAction, CustomersActionTypes} from "./customers.interface";
import axios from "axios";

export const fetchCustomers = ()=> {
    return async (dispatch: Dispatch<CustomersAction>) => {
        try {
            dispatch({type: CustomersActionTypes.FETCH_CUSTOMERS})
            const response = await axios.get<Customer[]>('https://jsonplaceholder.typicode.com/users')
            dispatch({type: CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS, payload: response.data})
        } catch (e) {
            dispatch({type: CustomersActionTypes.FETCH_CUSTOMERS_ERROR, payload: 'Error while fetching customers'})
        }
    }
}
```

Here we created action creator for async code.

That's it! Thunk middleware logic is simple. Thunk just returns dispatch function in thunk action, and nothing more.

To make our life simpler we will create hook called useActions. 

```typescript
// ~/src/store/hooks/use-action.hook.ts
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreators from '../index'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}
```

This hook allows us to not dispatch our thunk actions, but just call them.

```typescript
//Without hook
dispatch(fetchCustomers())

//With hook
fetchCustomers()
```

---

Now lets move to saga. In redux-saga we have three main points: **workers**, **watchers**, **effects**.
Redux-saga based on functions generators. 

First of all lets install redux-saga:

```bash
  $ npm i redux-saga
```

- Worker is a function, where we execute any async logic.

- Watcher is a function generator, where with special functions we choose type of action and worker,
which will execute by action type. Simply, watcher observes till any action executes. If any worker connected
to this action watcher calls this worker.

- Effects is a set of redux-saga functions, witch helps to make requests, make dispatch, observe workers and so on...

Function generators declaration:
```typescript
    function* genFunction() {
        for(let i = 0; i < 5; i++) {
            yield i
        }
    }
```

Generator returns us data partially. Here we have key word `yeild`, that equals to a breakpoint:
```typescript
    const iter = genFunction()
    
    const res = iter.next()
```

In `res` variable we receive object with next method, that contains such data:

```typescript
    const res = {
        value: 0, 
        done: false,
    }
```

Here value equals 0 cause our cycle starts with zero. If we call `iter.next()` more times,
in the end we will receive: 
```typescript
    const res = {
        value: undefined, 
        done: true,
    }
```

Create count.saga.ts in saga/count folder:
```typescript
// ~/src/store/saga/count/count.saga.ts
import {put} from 'redux-saga/effects'

const delay = (ms) => new Promise(res=>setTimeout(res,ms))

function* incrementWorkers() {

}

function* decrementWorkers() {

}

function* countWatcher() {

}
```

Put effect is a dispatch for async actions. Lets create delay function, that will 
create fake delay. Update our functions: 
```typescript
// ~/src/store/saga/count/count.saga.ts
import {call, put, SagaReturnType, takeEvery} from "redux-saga/effects"
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
    yield takeEvery(CountActionTypes.ASYNC_INCREMENT, asyncIncrementWorker)
    yield takeEvery(CountActionTypes.ASYNC_DECREMENT, asyncDecrementWorker)
}
```

takeEvery effect accepts action type as a first arg, and worker, that should be executed by this action.

In index.ts in saga folder we create aka combineReducers with all effect: 
```typescript
import {all} from 'redux-saga/effects'
import {countWatcher} from "./countSaga";

export function* rootWatcher() {
    yield all([countWatcher()])
}
```

Then you can simply dispatch your async action creator in component.
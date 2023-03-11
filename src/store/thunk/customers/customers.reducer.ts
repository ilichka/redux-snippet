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
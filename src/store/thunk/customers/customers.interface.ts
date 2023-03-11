export interface CustomersState {
    customers: Customer[],
    error: null | string,
    loading: boolean
}

export interface Customer {
    name: string;
    id: number;
}

export enum CustomersActionTypes {
    FETCH_CUSTOMERS = 'FETCH_CUSTOMERS',
    FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS',
    FETCH_CUSTOMERS_ERROR = 'FETCH_CUSTOMERS_ERROR',
    ADD_CUSTOMER = 'ADD_CUSTOMER',
    REMOVE_CUSTOMER = 'REMOVE_CUSTOMER',
}

export interface FetchCustomersAction {
    type: CustomersActionTypes.FETCH_CUSTOMERS
}

export interface FetchCustomersSuccessAction {
    type: CustomersActionTypes.FETCH_CUSTOMERS_SUCCESS
    payload: Customer[]
}

export interface FetchCustomersErrorAction {
    type: CustomersActionTypes.FETCH_CUSTOMERS_ERROR
    payload: string
}

export interface AddCustomerAction {
    type: CustomersActionTypes.ADD_CUSTOMER
    payload: Customer
}

export interface RemoveCustomerAction {
    type: CustomersActionTypes.REMOVE_CUSTOMER
    payload: Customer
}

export type CustomersAction = FetchCustomersAction | FetchCustomersSuccessAction | FetchCustomersErrorAction | AddCustomerAction | RemoveCustomerAction

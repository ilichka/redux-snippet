import {Dispatch} from "redux";
import {Customer, CustomersAction, CustomersActionTypes} from "./customers.interface";
import axios from "axios";

export const addCustomer = (customer: Customer) => ({type: CustomersActionTypes.ADD_CUSTOMER, payload: customer})
export const removeCustomer = (customer: Customer) => ({type: CustomersActionTypes.REMOVE_CUSTOMER, payload: customer})

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
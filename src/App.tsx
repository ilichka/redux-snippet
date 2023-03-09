import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {addCashAction, getCashAction} from "./store/cashReducer";
import {fetchCustomers} from "./store/asyncAction/customers";

function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customer.customers)
    console.log(customers)
    const addCash = (cash) => {
        dispatch(addCashAction(cash))
    }

    const getCash = (cash) => {
        dispatch(getCashAction(cash))
    }

    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now()
        }
        dispatch(addCustomerAction(customer))
    }

    const removeClient = (id) => {
        dispatch(removeCustomerAction(id))
    }

    return (
        <div className="App">
            <div style={{fontSize: "3rem"}}>{cash}</div>
            <div style={{display: "flex"}}>
                <button onClick={() => addCash(Number(prompt()))}>Add cash</button>
                <button onClick={() => getCash(Number(prompt()))}>Get cash</button>
                <button onClick={() => addCustomer(prompt())}>Add client</button>
                <button onClick={() => dispatch(fetchCustomers())}>Add client from database</button>
                <button onClick={() => getCash(Number(prompt()))}>Delete client</button>
            </div>
            {customers.length ? <div>
                {customers.map((customer) => <div onClick={() => removeClient(customer.id)}>{customer.name}</div>)}
            </div> : <div style={{fontSize: "2rem"}}>No clients</div>}
        </div>
    );
}

export default App;

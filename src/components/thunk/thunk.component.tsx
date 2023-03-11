import * as S from './thunk.styles'
import {Button} from "../common/button";
import {useDispatch} from "react-redux";
import {useActions} from "../../store/hooks";
import {Customer} from "../../store/thunk/customers";
import {useTypedSelector} from "../../store/hooks";

export const ThunkTemplate = () => {
    const dispatch = useDispatch();
    const cash = useTypedSelector((state) => state.cash.cash)
    const customers = useTypedSelector((state) => state.customers.customers)
    const {fetchCustomers, addCash, getCash, addCustomer, removeCustomer} = useActions()

    const handleAddCash = () => {
        const cash = Number(prompt())
        if (Number.isNaN(cash)) {
            return alert('You can pass only numbers')
        }
        addCash(cash)
    }

    const handleGetCash = () => {
        const cash = Number(prompt())
        if (Number.isNaN(cash)) {
            return alert('You can pass only numbers')
        }
        getCash(cash)
    }

    const handleAddCustomer = () => {
        const customer = {
            name: prompt() || '',
            id: Date.now()
        }
        addCustomer(customer)
    }

    const handleRemoveCustomer = (customer: Customer) => {
        removeCustomer(customer)
    }

    const addCustomersFromDB = () => {
        fetchCustomers()
    }

    return <S.ThunkTemplateWrapper>
        <S.Counter>{cash}</S.Counter>
        <S.ActionButtons>
            <Button title='Add cash' onClick={handleAddCash}/>
            <Button title='Get cash' onClick={handleGetCash}/>
            <Button title='Add customer' onClick={handleAddCustomer}/>
            <Button title='Add customer from database' onClick={addCustomersFromDB}/>
        </S.ActionButtons>
        <S.CustomersBlock>
        {customers.length ? customers.map((customer) => <S.Customer onClick={() => handleRemoveCustomer(customer)}>{customer.name}</S.Customer>)
         : <S.NoCustomer>No customers</S.NoCustomer>}
        </S.CustomersBlock>
    </S.ThunkTemplateWrapper>
}
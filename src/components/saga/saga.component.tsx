import * as S from './saga.styles'
import {Button} from "../common/button";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useTypedSelector} from "../../store/hooks";
import {asyncIncrement, asyncDecrement} from "../../store/saga/count";
import {fetchUsers, fetchUsersSaga} from "../../store/saga/users";

export const SagaTemplate = () => {
    const count = useTypedSelector((state) => state.count.count)
    const users = useTypedSelector((state) => state.users.users)
    const dispatch = useDispatch()

    const handleAsyncIncrement = useCallback(()=>dispatch(asyncIncrement()),[dispatch])
    const handleAsyncDecrement = useCallback(()=>dispatch(asyncDecrement()),[dispatch])
    const getUsers = useCallback(()=>dispatch(fetchUsersSaga()),[dispatch])

    return <S.SagaTemplateWrapper>
        <S.CashCounter>{count}</S.CashCounter>
        <S.ActionButtons>
            <Button title='Increment async' onClick={handleAsyncIncrement}/>
            <Button title='Decrement async' onClick={handleAsyncDecrement}/>
            <Button title='Get users from database' onClick={getUsers}/>
        </S.ActionButtons>
        <S.UsersBlock>
            {users.length ? users.map((user)=><S.User>{user.name}</S.User>) : <S.NoUser>No users</S.NoUser>}
        </S.UsersBlock>

    </S.SagaTemplateWrapper>
}
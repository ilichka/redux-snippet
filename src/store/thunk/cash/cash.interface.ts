export interface CashState {
    cash: number
}

export enum CashActionTypes {
    ADD_CASH = 'ADD_CASH',
    GET_CASH = 'GET_CASH',
}

export interface AddCashAction {
    type: CashActionTypes.ADD_CASH,
    payload: number
}

export interface GetCashAction {
    type: CashActionTypes.GET_CASH,
    payload: number
}

export type CashActions = AddCashAction | GetCashAction
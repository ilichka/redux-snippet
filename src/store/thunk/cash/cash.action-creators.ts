import {CashActionTypes} from "./cash.interface";

export const addCash = (cashAmount: number) => ({type: CashActionTypes.ADD_CASH, payload: cashAmount})
export const getCash = (cashAmount: number) => ({type: CashActionTypes.GET_CASH, payload: cashAmount})
import {CountActionTypes} from "./count.interface";

export const incrementSaga = () => ({type: CountActionTypes.INCREMENT_SAGA})
export const increment = () => ({type: CountActionTypes.INCREMENT})
export const incrementSuccess = () => ({type: CountActionTypes.INCREMENT_SUCCESS})
export const incrementError = (error: string) => ({type: CountActionTypes.INCREMENT_ERROR, payload: error})
export const decrementSaga = () => ({type: CountActionTypes.DECREMENT_SAGA})
export const decrement = () => ({type: CountActionTypes.DECREMENT})
export const decrementSuccess = () => ({type: CountActionTypes.DECREMENT_SUCCESS})
export const decrementError = (error: string) => ({type: CountActionTypes.DECREMENT_ERROR, payload: error})

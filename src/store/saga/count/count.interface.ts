export interface CountState {
    count: number,
    loading: boolean
    error: null | string
}

export enum CountActionTypes {
    INCREMENT = 'INCREMENT',
    INCREMENT_SUCCESS = 'INCREMENT_SUCCESS',
    INCREMENT_ERROR = 'INCREMENT_ERROR',
    ASYNC_INCREMENT = 'ASYNC_INCREMENT',
    DECREMENT = 'DECREMENT',
    DECREMENT_SUCCESS = 'DECREMENT_SUCCESS',
    DECREMENT_ERROR = 'DECREMENT_ERROR',
    ASYNC_DECREMENT = 'ASYNC_DECREMENT',
}

export interface IncrementAction {
    type: CountActionTypes.INCREMENT,
}

export interface IncrementSuccessAction {
    type: CountActionTypes.INCREMENT_SUCCESS,
}

export interface IncrementErrorAction {
    type: CountActionTypes.INCREMENT_ERROR,
    payload: string
}

export interface AsyncIncrementAction {
    type: CountActionTypes.ASYNC_INCREMENT,
}

export interface DecrementAction {
    type: CountActionTypes.DECREMENT,
}

export interface DecrementSuccessAction {
    type: CountActionTypes.DECREMENT_SUCCESS,
}

export interface DecrementErrorAction {
    type: CountActionTypes.DECREMENT_ERROR,
    payload: string
}

export interface AsyncDecrementAction {
    type: CountActionTypes.ASYNC_DECREMENT,
}

export type CountActions = IncrementAction | IncrementSuccessAction | IncrementErrorAction | AsyncIncrementAction | DecrementAction | DecrementSuccessAction | DecrementErrorAction | AsyncDecrementAction
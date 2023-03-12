export interface CountState {
    count: number,
    loading: boolean
    error: null | string
}

export enum CountActionTypes {
    INCREMENT_SAGA = 'INCREMENT_SAGA',
    INCREMENT = 'INCREMENT',
    INCREMENT_SUCCESS = 'INCREMENT_SUCCESS',
    INCREMENT_ERROR = 'INCREMENT_ERROR',
    DECREMENT_SAGA = 'DECREMENT_SAGA',
    DECREMENT = 'DECREMENT',
    DECREMENT_SUCCESS = 'DECREMENT_SUCCESS',
    DECREMENT_ERROR = 'DECREMENT_ERROR',
}

export interface IncrementSagaAction {
    type: CountActionTypes.INCREMENT_SAGA,
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

export interface DecrementSagaAction {
    type: CountActionTypes.DECREMENT_SAGA,
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

export type CountActions = IncrementSagaAction | IncrementAction | IncrementSuccessAction | IncrementErrorAction | DecrementSagaAction | DecrementAction | DecrementSuccessAction | DecrementErrorAction
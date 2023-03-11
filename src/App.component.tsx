import React from 'react';
import {SagaTemplate} from "./components/saga";
import * as S from './App.styles'
import {GlobalStyles} from "./Global.styles";
import {ThunkTemplate} from "./components/thunk";

function App() {
    return (
        <S.AppWrapper>
            <GlobalStyles/>
            <S.SagaSide>
                <S.SideTitle>Saga side</S.SideTitle>
                <SagaTemplate/>
            </S.SagaSide>
            <S.ThunkSide>
                <S.SideTitle>Thunk side</S.SideTitle>
                <ThunkTemplate/>
            </S.ThunkSide>
        </S.AppWrapper>
    );
}

export default App;

import * as S from "./button.styles";
import {FC} from "react";
import {ButtonProps} from "./button.interface";

export const Button:FC<ButtonProps> = ({title,...rest}) => {
    return <S.ButtonWrapper {...rest}>
        {title}
    </S.ButtonWrapper>
}
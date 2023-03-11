import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex: 1 0 50%;
`;

export const SagaSide = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ce1c48;
`

export const SideTitle = styled.div`
  font-size: 40px;
`

export const ThunkSide = styled(SagaSide)`
  border-right: none;
  border-left: 1px solid #ce1c48;
`
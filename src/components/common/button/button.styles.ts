import styled from "styled-components";

export const ButtonWrapper = styled.div`
  border-radius: 8px;
  background-color: #ce1c48;
  color: #FFFFFF;
  padding: 5px 10px;
  cursor: pointer;
  transition: opacity ease .3s;
  user-select: none;
  
  :hover {
    opacity: .8;
  }
`
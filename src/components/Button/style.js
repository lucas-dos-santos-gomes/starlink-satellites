import styled from "styled-components";

export const StyledButton = styled.button`
  & {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: ${({ more }) => more === 'more' ? 'rgb(65, 255, 65)' : 'rgb(255, 65, 65)'};
    margin: 0 0 10px;
  }

  /* plus sign */
  & .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .sign svg {
    width: 17px;
  }

  & .sign svg path {
    fill: white;
  }
  /* text */
  & .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.1em;
    font-weight: 600;
    transition-duration: .3s;
    white-space: nowrap;
  }
  /* hover effect on button width */
  &:hover {
    width: ${({ more }) => more === 'more' ? '160px' : '170px'};
    border-radius: 40px;
    transition-duration: .3s;
  }

  &:hover .sign {
    width: 30%;
    transition-duration: .3s;
  }
  /* hover effect button's text */
  &:hover .text {
    opacity: 1;
    width: 80%;
    transition-duration: .3s;
    padding-right: 5px;
  }
  /* button click effect*/
  &:active {
    transform: translate(2px ,2px);
  }
`;
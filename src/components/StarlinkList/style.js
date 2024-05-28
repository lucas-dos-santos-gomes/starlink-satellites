import styled from "styled-components";

export const List = styled.div`
  & {
    max-height: 100vh;
  }

  & > h1 {
    font-size: 30px;
    line-height: 1.1;
    text-align: center;
    margin-block: 20px;
  }

  & li {
    padding: 5px 20px;
    list-style: disc;
  }
`;

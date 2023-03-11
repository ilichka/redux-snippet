import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    #root {
        min-height: 100vh;
      display: flex;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
`;
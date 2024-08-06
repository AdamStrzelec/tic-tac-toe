import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: border-box;
    }
    body {
        font-family: 'Inter';
        font-size: 13px;
        font-weight: 400;
        line-height: 18px;
        background-color: #F7F7F7;
    }
`;

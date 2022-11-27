import { createGlobalStyle } from 'styled-components';
import backgroudWallet from '../images/backgroundWallet.png';

const GlobalStyled = createGlobalStyle`
   *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, :root {
    /* min-height: 100%;
    min-width: 100%; */
  }

  body {
    display: flex;
    justify-content: center;
    background-image: url(${backgroudWallet});
    background-repeat: no-repeat;
    background-color: rgba(47, 193, 140, 1);
    object-fit: cover;
    background-size: 100vw;
  }
`;

export default GlobalStyled;

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  /*--------------------------------
    BASIC RESET
  ---------------------------------*/
  *,
  *::before,
  *::after{
    margin:0;
    padding:0;
    /* all elements will inherit from the body
     where we set box-sizing: border-box */
    box-sizing: inherit;
  }

  /*--------------------------------
    CSS VARIABLES
  ---------------------------------*/
  :root{
    --color-primary: #eb2f64;
    --color-primary-light: #FF3366;
    --color-primary-dark: #BA265D;

    --color-light-0: #fff;
    --color-light-1: #faf9f9;
    --color-light-2: #f4f2f2;
    --color-light-3: #f0eeee;
    --color-light-4: #ccc;
    --color-dark-1: #333;
    --color-dark-2: #777;
    --color-dark-3: #999;

    --warn-color: red;

    --box-shadow-1: 0 2rem 6rem rgba(0,0,0,.3);
    --box-shadow-2: 0 2rem 5rem rgba(0,0,0,.07);
    --box-shadow-3: 0 0.2rem 1rem rgba(0,0,0,.2);
    --box-shadow-4: 0 1rem 1.5rem rgba(0, 0, 0, 0.3);

    --box-shadow-xs: 0 0.1rem 0.5rem rgba(0,0,0,.2);
    --box-shadow-sm: 0 0.2rem 1rem rgba(0,0,0,.2);
    --box-shadow-md: 0 1rem 4rem rgba(0,0,0,.2);
    --box-shadow-lg: 0 2rem 8rem rgba(0,0,0,.2);


    --border-1: 1px solid var(--color-light-3);
    --border-2: 1px solid var(--color-light-2);

    --body-content-width: 90vw;
  }


  /*--------------------------------
    SCALING & LAYOUT
  ---------------------------------*/
  html{
    /** FONT size and relative sizes calculation using rem
    we want to enable user to set the fontsize but we also need
    easy way to calculate out rem units. To achieve both the following
    approach is advised. Default font size is 16px. So setting font size
    to 100% we now that our starting size for 1rem = 16px. It would be easer
    for us if we can set start to 10px so we can easily use decimals in rem,
    for example 10px = 1rem => 1.65rem = 16.5px. To achive easy math we
    can set font size to 10/16 = 62.5%. Note! when changing font size
    the complete layout will change because all dimensions are set
    in rem units.
    */

    /* estimated 16px=1rem */
    font-size: 100%;

    @media screen and (max-width:$width-sm){
      font-size: 75%;
    }

    @media screen and (max-width:$width-xs){
      font-size: 50%;
    }

  }

  body{
    min-height: 100vh;
    @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
    font-family: 'Lato', sans-serif;
    color: var(--color-dark-1);
    box-sizing: border-box;
  }
`

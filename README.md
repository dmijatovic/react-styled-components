# React webpack 4, styled components starter template

This is webpack 4 starter with styled components and babel version 7. I started completely from scratch taking all latest versions avaliable at the time (2019-01-19).

## NPM installation scripts

Just run `npm install` and all libs mentioned below will be installed.

```bash
  # 1. install react and router dom
  npm i -s react react-dom react-router-dom
  # 2. install webpack modules
  npm i -D webpack webpack-cli webpack-dev-server webpack-bundle-analyzer
  # 3a. install babel loaders - basics v7
  npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react
  # 3b. install babel loaders - used features v7
  npm i -D @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
  # 4. install styled components
  npm i -D styled-components  babel-plugin-styled-components
  # 5. install other webpack util plugins
  npm i -D html-webpack-plugin url-loader file-loader copy-webpack-plugin uglifyjs-webpack-plugin clean-webpack-plugin
  # 6. ESLint for react and styled components
  npm i -D eslint babel-eslint eslint-plugin-react eslint-plugin-styled-components
  # 7. install prettier for
  npm i -D prettier eslint-plugin-prettier
  # 8. babel polyfills (basic), fetch polyfil for ie11
  npm i -s @babel/polyfill whatwg-fetch
  # 9. testing with jest & enzyme incl. eslint plugin
  npm i -D jest eslint-plugin-jest enzyme enzyme-adapter-react-16

```

## NPM scripts

- `npm start:` start webpack in watch mode passing dev environment (--env=dev).
- `npm run dev:` start webpack-dev-server using dev environment (--env=dev)
- `npm run build:dev:` Build development version.
- `npm run build:` Build production version to dist folder. Note that previous build will be removed first.

## Webpack config scripts

Webpack configuration is stored in webpack folder. Initially 2 separate def files are created. Based on --env parameter passed on init one of the configuration files is loaded as webpack config module (see webpack.config.js)

- `dev:` this is development environment setup (webpack/dev.js)
- `prod:` this is production build setup (webpack/prod.js).

**Note! Configuration is not 'shared' between files. When updating, please adjust/update the properties in both files where needed.**

BTW: I have chosen here simpler approach with some code duplication above more complex setup (without code duplication).

## Folder Structure

- **`assets`**: all asset files used like original logo and other images etc. Excel template for creating json files is also here.
- **`dist`**: builds are here
- **`src`**: holds all react code to be processed by webpack. **All js/css files need to be inside `src` folder**, otherwise Webpack won’t see them.
  - **component**: holds shared/general react components used by multiple pages
  - **layout**: holds react components which define global page layout
  - **page**: holds react components that represent pages (uniek in design/composition)
  - **router**: holds defined routes, react router setup and main router component. This router component is then integrated into main/global layout component.
  - **store**: holds all redux files used to setup redux store including implementation of custom middleware functions.
  - **styles**: holds css (js possible too) files related to defining global styles, overrides, css variables etc.
  - **utils**: holds uitility function
- **static**: static files that will be included in the build
- **webpack**: webpack configuration file from react-scipts

## Git branches

- master: complete portions (should be) ready for use
- dev: development branch

## Setup gotcha's :-)

### Webpack plugins

Some plugins depend on the other webpack or third party plugins. In some cases it is not sufficient to use only webpack plugin! Examples

- url-loader depends on file-loader at the moment you set the limit on file size that can be added as base64 into js file.
- postcss-loader depends on third party poscss module which in turns is collection of hondrets of modules that need to be 'pulled' separately. For example if you want to apply autoprefixing through webpack you need: postcss, postcss-loader and autoprefixer.
- babel polyfill need to be project dependency as it is shipped with the project.
- for IE 11 support you need additional polyfills to support fetch "whatwg-fetch" and include it in index.js as first import
- for IE 11 you need also need to include @babel/polyfill
- for IE 11 to have autoperfixer add values for all CSS variables you need to import index.scss file into index not index.js that imports other scss files; this seem not to work?

```javascript
//at the top of index.js file, before react add
//import fetch polyfill
import "whatwg-fetch";
//polyfills
import "@babel/polyfill";
//import APP styles firs (if extracted to separate file)
import "./styles";
```

### Webpack dev server and history router

Ensure dev server has url rewrites defined. On 'normal' server this setting is required. Also with webpack dev server the flag need to be set to true!

```javascript
  devServer: {
    historyApiFallback: true,
  },
```

### Browser support & styled components

[Styled components](https://www.styled-components.com/docs/basics#motivation) DOES NOT use [browserlist](https://browserl.ist/?q=last+2+version%2C%3E+1%25%2Cnot+IE+10).

Automatic vendor prefixing is added for older browsers including IE8. But currently there is no option to define which browsers should be supported concerning the autoprfixing.

Note! Styled components uses stylus engine.

### [ESLint](https://eslint.org/docs/user-guide/configuring)

ESLint requires configuration file. The preference is to have .eslintrc file defined per project in order to tweak the rules.
Basic setup is perfomed based on this [video](https://www.youtube.com/watch?v=nxxl2H_TOTc&list=PLMWjeRChIK6bnp6qaS3rxLGCpc9aQYzEE)

Beside eslint we need to use react plugin eslint-plugin-react.

```bash
  # ESlint setup for react
  npm i -D eslint babel-eslint eslint-plugin-react
```

```js
  {
    //extends basic eslint recommendations and react
    "extends": ["eslint:recommended","plugin:react/recommended"],
    //use babel plugin
    "parser": "babel-eslint",
    //parser ECMA version 7
    "parserOptions": {
      "ecmaVersion": 7,
      //using classes
      "sourceType": "module",
      //enable react features
      "ecmaFeatures": {
        "jsx": true
      }
    },
    //environments
    "env": {
      "node":true,
      "browser": true,
      "jest": true
    },
    //customizing default rules
    "rules": {
      //warn on used variables but not arguments
      "no-unused-vars": ["warn",{
        "args":"none"
      }],
      //warn on console.logs
      "no-console": 1,
      //no idea what rule is this
      "no-unexpected-multiline": "warn",
      //warn on improper propTypes when these are declared
      "react/prop-types": [1,{"skipUndeclared":true}]
    }
  }

```

### Prettier

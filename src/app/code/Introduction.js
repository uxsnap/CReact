export const PACKAGES_1 = `npm i -D webpack webpack-cli`
export const WEBPACK_1 = `npx webpack-cli init`
export const WEBPACK_2 = 
`? Which of the following JS solutions do you want to use? ES6
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Do you want to add PWA support? No
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? No
? Do you want to extract CSS for every file? No
? Do you like to install prettier to format generated configuration? No
? Pick a package manager: npm
`
export const BABEL_1 =
`{
  "plugins": [
    "@babel/syntax-dynamic-import", 
    "@babel/plugin-syntax-jsx", 
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "createElement"
      }
    ]
  ],
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}
`;

export const INDEX_HTML_1 =
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Webpack App</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="dist/main.js"></script>
    </body>
</html>
`

export const PACKAGES_2 = `npm i -D @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx @babel/preset-env`

export const CREATE_ELEMENT = `export const createElement = (type, props, ...children) => ({
  type,
  props: props || {},
  children
});`

export const DIR_1 = `├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
├── .babelrc
└── webpack.config.js
`;
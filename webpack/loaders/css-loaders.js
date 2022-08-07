const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV === 'development';

//inject CSS into the DOM (tag style)
const styleLoader = {
  loader: 'style-loader',
};

//creates a CSS file per JS file which contains CSS (and add into html as <link rel="stylesheet" href="path/to/style.css" />)
const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader, //creates a CSS file per JS file which contains CSS
};

module.exports = [
  devMode ? { ...styleLoader } : { ...MiniCssExtractPluginLoader },
  { loader: 'css-modules-typescript-loader'},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
  { loader: 'css-loader', options: { modules: true } }, //translates CSS into CommonJS (interprets @import and url() like import/require() and will resolve them)
];
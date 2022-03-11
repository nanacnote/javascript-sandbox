const {extendDefaultPlugins} = require('svgo');

module.exports = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: extendDefaultPlugins([
    'sortAttrs',
    'prefixIds',
    'removeDimensions',
    'removeStyleElement',
    'removeScriptElement',
    'convertStyleToAttrs',
    {name: 'removeViewBox', active: false},
  ]),
};

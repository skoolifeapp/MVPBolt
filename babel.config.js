// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Optionnel mais utile si tu continues à voir un token TS non compris
    plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]],
  };
};

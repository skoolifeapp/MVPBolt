module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Optionnel : sécurise le parse TS si un paquet laisse passer du .ts
    plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]],
  };
};

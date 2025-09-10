module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Ajout prudent pour garantir le parse de TS partout si nécessaire
    plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]],
  };
};
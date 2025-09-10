const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Ajout des extensions TypeScript
  config.resolver.sourceExts.push("ts", "tsx");

  // Forcer la compilation des modules contenant du TS
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-typescript-transformer"),
  };

  // Inclure expo-modules-core pour qu'il soit transformé
  config.resolver.nodeModulesPaths = [
    "node_modules",
    "node_modules/expo-modules-core"
  ];

  return config;
})();
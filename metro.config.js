const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ 1) Privilégier les builds JS des paquets (main/module) avant "react-native"
config.resolver = {
  ...config.resolver,
  resolverMainFields: ['main', 'module', 'react-native'],

  // ✅ 2) Rediriger explicitement expo-modules-core vers son dossier JS compilé
  alias: {
    ...(config.resolver?.alias ?? {}),
    'expo-modules-core/src': 'expo-modules-core/build',
    'expo-modules-core': 'expo-modules-core/build',
  },
};

module.exports = config;

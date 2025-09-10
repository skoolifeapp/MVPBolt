const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ Privilégier les builds JS (main/module) avant "react-native" qui peut pointer sur src/*.ts
config.resolver = {
  ...config.resolver,
  resolverMainFields: ['main', 'module', 'react-native'],
  // Optionnel mais utile si un paquet expose des "src" explicitement
  alias: {
    ...(config.resolver?.alias ?? {}),
    'expo-modules-core/src': 'expo-modules-core/build',
    'expo-modules-core': 'expo-modules-core/build',
  },
};

module.exports = config;

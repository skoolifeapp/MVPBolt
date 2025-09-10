const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ Privilégie les builds JS des paquets, et redirige toute importation vers le dossier build/
config.resolver = {
  ...config.resolver,
  resolverMainFields: ['main', 'module', 'react-native'],
  alias: {
    ...(config.resolver?.alias ?? {}),
    'expo-modules-core/src': 'expo-modules-core/build',
    'expo-modules-core': 'expo-modules-core/build',
  },
};

module.exports = config;

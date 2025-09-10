// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// ✅ Privilégier les builds JS des packages (main/module) avant "react-native"
config.resolver = {
  ...config.resolver,
  resolverMainFields: ['main', 'module', 'react-native'],
};

module.exports = config;

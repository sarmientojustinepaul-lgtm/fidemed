const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Block eslint files from being bundled by Metro
config.resolver.blockList = [
  new RegExp(path.resolve(__dirname, 'eslint.config.js').replace(/\\/g, '\\\\')),
  /node_modules\/eslint\/lib\/.*/,
  /node_modules\/eslint-plugin-import\/.*/,
  /node_modules\/eslint-config-expo\/.*/,
];
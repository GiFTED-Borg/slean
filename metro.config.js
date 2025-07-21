// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
  extraNodeModules: {
    ...config.resolver.extraNodeModules,
    crypto: require.resolve("expo-crypto"),
    util: require.resolve("./empty-module.js"),
    zlib: require.resolve("./empty-module.js"),
    jose: require.resolve("./empty-module.js"),
    http: require.resolve("./empty-module.js"),
    https: require.resolve("./empty-module.js"),

    fs: path.resolve(__dirname, "./polyfills/fsPolyfill.js"),
    "text-encoding": require.resolve("text-encoding"),
    stream: require.resolve("stream-browserify"),
    // Add web streams API polyfill
    "web-streams-polyfill": require.resolve("web-streams-polyfill"),
    // Add events polyfill
    events: require.resolve("events"),
  },
};

module.exports = config;

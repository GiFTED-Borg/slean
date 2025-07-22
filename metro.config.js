const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
let config = getDefaultConfig(__dirname);

// First, apply NativeWind configuration
config = withNativeWind(config, {
  input: "./app/global.css", // Make sure this file exists
});

// Then update resolver for SVGs and polyfills
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
    "web-streams-polyfill": require.resolve("web-streams-polyfill"),
    events: require.resolve("events"),
  },
};

module.exports = config;

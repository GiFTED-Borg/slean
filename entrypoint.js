/* eslint-disable import/first  */
// Import required polyfills first
// import "@ethersproject/shims";
// import { Buffer } from "buffer";
// import "fast-text-encoding";
// import "react-native-get-random-values";
// import "stream-browserify";
// import "text-encoding";
// import "web-streams-polyfill";

// Import required polyfills first
import "fast-text-encoding";
import "react-native-get-random-values";
// import { Buffer } from "buffer";
// global.Buffer = Buffer;
import "@ethersproject/shims";
// Then import the expo router
import "expo-router/entry";

// // Set up global polyfills
// global.Buffer = Buffer;
// global.process = global.process || {};
// global.process.env = global.process.env || {};
// global.process.version = global.process.version || "v16.0.0";

// // Fix crypto polyfill issues
// if (typeof global.crypto === "undefined") {
//   global.crypto = {};
// }

// // Ensure crypto.getRandomValues is available
// if (!global.crypto.getRandomValues) {
//   const { getRandomValues } = require("react-native-get-random-values");
//   global.crypto.getRandomValues = getRandomValues;
// }

// // Fix Node.js crypto module compatibility
// if (typeof global.crypto.isKeyObject === "undefined") {
//   global.crypto.isKeyObject = () => false;
// }

// Then import the expo router
// import "expo-router/entry";

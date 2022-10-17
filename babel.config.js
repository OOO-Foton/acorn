module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      "module:metro-react-native-babel-preset",
      "babel-preset-expo"
  ],
  plugins: [
      [
          "module:react-native-dotenv", {
              "moduleName": "react-native-dotenv",
              "path": ".env",
              "blacklist": null,
              "whitelist": null,
              "safe": false,
              "allowUndefined": false
          }
      ]]
  };
};

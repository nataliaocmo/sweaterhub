module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['dotenv-import', { moduleName: 'react-native-dotenv' }]
    ],
  };
};

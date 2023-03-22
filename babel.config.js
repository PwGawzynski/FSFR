// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@selfTypes': './frontendSelfTypes/moduleProps',
            '@sharedTypes': '../farm-service-be/types',
          },
        },
      ],
    ],
  };
};

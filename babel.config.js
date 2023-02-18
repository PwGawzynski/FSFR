module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
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

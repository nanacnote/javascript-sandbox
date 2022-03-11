const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  webpackFinal: async (config, {configType}) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': path.resolve(__dirname, '..', 'src', 'assets'),
      '@shared': path.resolve(__dirname, '..', 'src', 'shared'),
      '@stories': path.resolve(__dirname, '..', 'src', 'stories'),
      '@utils': path.resolve(__dirname, '..', 'src', 'utils'),
    };

    return config;
  },
};

// Export a function. Accept the base config as the only param.
const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])]
      }
    };

    newConfig.resolve.modules.push(srcPath);

    newConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            url: true,
            importLoaders: 1,
            modules: {
              mode: 'local',
              localIdentName: '[name]_[local]__[hash:base64:5]'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
            sassOptions: {
              includePaths: ['src/styles']
            }
          }
        }
      ]
    });

    // Return the altered config
    return newConfig;
  }
};

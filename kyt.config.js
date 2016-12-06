const getWebpackConfig = require('./kyt.webpack.config.js')

// Base kyt config for stage.
module.exports = {
  serverURL: 'http://localhost:8080',
  debug: false,
  modifyWebpackConfig: (baseConfig, options) => {
    return getWebpackConfig(baseConfig, options)
  }
}

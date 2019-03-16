const path = require('path')

module.exports = {
  target: 'serverless',
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.resolve = Object.assign({}, config.resolve, {
      alias: Object.assign({}, config.resolve.alias, {
        react: path.resolve(path.join(__dirname, './node_modules/react'))
      })
    })

    return config
  }
}

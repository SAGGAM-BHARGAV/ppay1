/* craco.config.js */
module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
            // add more fallbacks as needed
          }
        }
      }
    }
  }
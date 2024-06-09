module.exports = function override(config) {
    config.resolve.fallback = {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      os: require.resolve('os-browserify/browser'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/')
    };
  
    return config;
  };
  
  
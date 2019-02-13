module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/finance-hd-local/'
    : '/',
  chainWebpack: (config) => {
    config.plugins
      .delete('split-manifest')
      .delete('inline-manifest');
  },
};

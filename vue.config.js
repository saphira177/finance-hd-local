module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/finance-hd/'
    : '/',
  chainWebpack: (config) => {
    config.plugins
      .delete('split-manifest')
      .delete('inline-manifest');
  },
};

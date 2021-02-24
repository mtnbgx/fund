module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
}

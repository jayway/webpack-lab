const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const port = 8080;

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  stats: {
    colors: true,
    errorDetails: true,
    chunks: false,
  },
})
  .listen(port, 'localhost', (err, result) => {
    if (err) {
      return console.log(err);
    }

    console.log(`Listening at http://localhost:${ port }/`);
  });
# Webpack watching

So far have we been starting our webpack build process manually. But you would pretty fast go crazy if you always had to do that. So lets go through a couple of different ways to implement watching with webpack.

## Watching with cli

This is probably the easiest way to watch with webpack.

In package.json add another script called watch that is the same as build but also has the --watch flag like this:

```json
"scripts": {
  "build": "webpack --colors --display-error-details --config webpack.config.js",
  "watch": "webpack --colors --display-error-details --config webpack.config.js --watch"
},
```

**That's it!** Run the watch script and try changing in the pcss and js files. <br />
This should rebuild your bundle and if you reload the browser you can see the result.

## Webpack-dev-server with HMR

So, watching is good and all, but it's still kinda annoying to reload the browser, so let's fix that.

Webpack has something called HMR (hot module replacement). With this enabled, your web page will be updated live, without any page reload. You might still have to reload the page if you need to reset the js state in a redux store for example, but for styling it's perfect.

### NPM modules

Webpack HMR updates the web page by serving your bundles from memory (not file) through a socket. Keeping the bundles in memory and serving them through a socket is done by webpack-dev-server, so lets start by installing that:

````text
npm i webpack-dev-server --save-dev
````

We also need a hot loader for react (hmr is often called hot), so let's install that as well:

````text
npm i react-hot-loader --save-dev
````

### Webpack config

In order to make webpack-dev-server work we need to update our webpack config a bit.

1. Change entry to this 

```javascript
entry: [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  './app/index.js',
],
```

Above basically means, run 'node_modules/webpack-dev-server/client/index.js' and pass 'http://localhost:8080' as a param.
After that, run 'node_modules/webpack/hot/only-dev-server.js' and then lastly run our own src code.

2.  Update 'use' in our js loader so that we include 'react-hot-loader' in order to make HMR work better with react:

```javascript
use: ['react-hot-loader', 'babel-loader'],
```

3. We also need to add a plugin for HMR.
 
At the top of our config add:

```javascript
const webpack = require('webpack');
```

At the end (in the root of the object) add:

```javascript
plugins: [
  new webpack.HotModuleReplacementPlugin(),
]
```

### Dev server

Create a new file called 'devServer.js' in this folder with following content:

```javascript
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
```

In above code we import our webpack config and then add some extra webpack-dev-server options that we need for our dev-server. 

Many of the webpack-dev-server options is the same as in the regular webpack.config, but in a more flat structure.

The important parts in above code is **hot** which is the boolean for HMR and **publicPath**. publicPath is where our bundle will be available for the client. Since we set it as '/', let's update it index.html as well.

Change:
```html
<script src="build/bundle.js"></script>
```
To:
```html
<script src="/bundle.js"></script>
```

In order to run our dev-server, let's add another npm script:
```text
"start": "node devServer.js"
```

**That's it!** Run the start script and try changing in the pcss and js files. <br />
The browser should update without any reload! :)
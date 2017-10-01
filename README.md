# Getting started with Webpack 3!
Webpack is a highly configurable module bundler that also transpiles code with loaders and plugins.

In this lab you will get started with the basics of webpack 3 and maybe have time to learn some more advanced concepts as well.

## Quick start

1. Install nodejs and npm if you haven't already
2. Clone or download this repo
3. Run npm install in this folder

Now you're ready to rumble!

## Labs

We will transpile react and postcss code in this lab. But webpack isn't limited to that, it can transpile angular, vuejs, sass, less etc as well.

### 1. Transpile react

If you look in the project folder there isn't much to be excited about right now.
There is an index.html file which just says that react isn't loaded, some hello world react code in the app folder and an empty webpack config.

If you haven't already, run npm i in this folder.

Let's start coding!

In **webpack.config.js**, add following
```js
module.exports = {
  name: 'Client',
  	devtool: 'source-map',
  	resolve: {
  		alias: {
  			joi: 'joi-browser'
  		}
  	},
  
  	entry: [
  		'babel-polyfill',
  		APP_DIR,
  	],
  
  	output: {
  		path: BUILD_DIR,
  		// We need [name] here for app.manifest.js and app.vendor.js
  		filename: 'static/app.[name].js',
  	},
  
  	module: {
  		rules: [
  			{
  				test: /\.js$/,
  				use: jsLoaders,
  				exclude: /node_modules/,
  			}
  		],
  	},
}
```
# Getting started with Webpack 3!
Webpack is a highly configurable module bundler that also transpiles code with loaders and plugins.

In this lab you will get started with the basics of webpack 3 and maybe have time to lab with some more advanced concepts as well.

It is probably good (but might not be necessary) if you start of the lab by reading through 'How does webpack work' below. You can then move on to the exercises at the end. 

## How does webpack work?

Webpack has 4 core concepts. Entry, loaders, output and plugins.

### Entry

When you run webpack, it will start looking at your entry or entry(ies). From there it will look for imports and crawl through all imports it finds file by file while building a module graph. This graph is called a manifest and is how webpack knows which module is used where. 

A module is a javascript concept but webpack "transforms" all assets to modules so that we can for example import css or svg files in our javascript code.

### Loaders

Webpack by itself only understands javascript. So, how does webpack transform all assets to modules you might wonder, that's where the loaders come in. 

When webpack finds an imported asset, it will look for a loader that match the asset type through regexp (usually just file extension). The loader will then transform the asset to a module for webpack to use.

So transforming assets to modules is good and all, but that's not the only thing we use the loaders for. We use them to transpile our code as well. For example we can use the babel loader to transpile javascript in ES7 to ES5 or styling in LESS to CSS. Transpiling is really nice since it allows us to write code in a better way without losing browser support.

### Output

Here we tell webpack where the finished bundle(s) should end up. We can also tell webpack to give the bundle(s) dynamic names based on for example hashes and entry names.

### Plugins

Plugins is additional features you might want that isn't really transpiling/transforming. There have however been some loaders that depends on plugins, but that is disappearing now (because of dynamic javascript configs).

Here is some examples of common plugins to give you an idea:

1. ExtractTextWebpackPlugin extracts all css modules to a separate css bundle.

2. With the DefinePlugin we can set global variables that will be available through the whole app (often used for process.ENV in order to know if the app is build for develop or production).

3. CommonsChunkPlugin extract common modules shared between different bundles and puts them in a separate one (used for vendor bundle).

You can read more about webpack and how it works <a href="https://webpack.js.org/concepts/" target="_blank">here</a>

## Quick start

1. Install nodejs and npm if you haven't already
2. Clone or download this repo
3. Run npm install in this folder

Now you're ready to rumble!

## Exercises

We will transpile react and postcss code in this lab. But webpack isn't limited to that, it can transpile angular, vuejs, sass, less etc as well.

I recommend that you do the exercises in order, but it isn't necessary since they are independent of each other.

Start every exercise by running "**npm i**" in the exercise folder.

1. [transpile-react](./transpile-react)
1. [code-split](./code-split)
1. [transpile-postcss](./transpile-postcss)
1. [watching](./watching)
1. [resolvers](./resolvers)

## Challenges

1. Use [file-loader](https://github.com/webpack-contrib/file-loader) to load images.
1. Minify code with a production build, [webpack-guide](https://webpack.js.org/guides/production/).
1. Implement cache busting, [webpack-guide](https://webpack.js.org/guides/caching/).
1. Try lazy-loading, [webpack-guide](https://webpack.js.org/guides/lazy-loading/).


## Additional recommended links

1. [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) is an amazingly easy tool that let's you see which modules your bundle contains and how big they are. Very good for optimization.

1. In a bigger project you will most likely want to split up your webpack configs into different builds and/or client/server. [webpack-merge](https://github.com/survivejs/webpack-merge) let's you merge for example an 'common' config to both the develop and production build in a pain free way.
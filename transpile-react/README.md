# Transpile react

If you look in this folder there isn't much to be excited about right now.
There is an index.html file which just says that react isn't loaded, some hello world react code in the app folder and 2 empty config files for babel and webpack.

Before we dig into our config files and start coding, let's go through what babel is.

## What is babel?

Babel is a compiler that transforms the latest js syntax to old ES5 which all browsers support. It does this with lots of different plugins that each take care of a specific transformation. There is for example an arrow function plugin and a constants plugin. 

It would however be very tedious to add all these plugins manually and babel therefor has something called presets. A preset is a collection of plugins with a common purpose. For example an ES6 preset would contain all plugins necessary to transform javascript in ES6 to ES5.

Even though babels main purpose is to allow us to use the latest js syntax. It also has presets for common js libraries such as React, Angular and Vue.

## Babel setup

We will use babel to transpile our js and react code. So before we dig into webpack, let's start by setting up babel.

Install babel deps by running following in this folder:
````text
npm i --save-dev babel-core babel-preset-env babel-preset-stage-0 babel-preset-react
````

In .babelrc add following
```json
{
  "presets": [
    "react",
    "env",
    "stage-0"
  ]
}
```

Env above means that we want the latest js standard (es2017), previously called "latest". Stage-0 means that we want all the proposed javascript features that isn't in the standard yet.

## Webpack setup

In **webpack.config.js**, add following
```js
const path = require('path');

module.exports = {
  name: 'Client',
  devtool: 'source-map',

  entry: './app/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
};
```
Lets go through what we have above.

1. **devtool** is pretty much if we want to have a slower build with source maps or a faster one without it. I think the 3 most common values here is 'eval', 'source-map' and 'eval-source-map'.

    - With 'eval' you only see the generated code bundle when inspecting with dev tools for example.
    - With 'source-map' you can see the original source code.
    - With 'eval-source-map' you can also see the original source code, but rebuilds (with watching) are faster. 
    
    I personally never use 'eval' because the time won in faster builds is by far lost on extra time spent on debugging instead (it is really hard to debug without source maps). <br />
    'eval-source-map' is probably the best option, it does however not work well with some loaders so I usually end up with just 'source-map' instead.
    
    You can read more about source maps and webpack devtool [here](https://webpack.js.org/configuration/devtool/)

2. **entry** is like it sounds, the first file that webpack will start looking at when doing its magic.

3. **output** is where we want our finished bundle to end up. Path here is which folder we choose, the path here needs to be absolute, therefor we resolve the build folder with the nodejs path module.

4. **module.rules** This is where the transpiling comes in. 

    - **test** is a regexp for which files we want transpiled with this rule. 
    - **exclude** is the opposite from test, here we can be explicit about files that we don't want to transpile with this rule.
    - **use** is which loader we want to use.

### Missing dependencies

You might have realised that we are missing some dependencies, webpack and the babel-loader!<br>
Lets add them by running following:
````text
npm i --save-dev webpack babel-loader
````

### Almost there!

Now we just need a npm script to run our webpack code.<br>
Add following to package.json
````json
  "scripts": {
    "build": "webpack --colors --display-error-details --config webpack.config.js"
  },
````

Here we point out our webpack.config.js file with the --config option as well as making the output a bit prettier with the --colors option.

## Lets try it out

Run "npm run build" in this folder.
If you have followed the instructions correctly, you should hopefully see something like this:<br/>
````text
Hash: 7f9339d7e8897ca5534d
Version: webpack 3.6.0
Time: 1949ms
        Asset    Size  Chunks                    Chunk Names
    bundle.js  748 kB       0  [emitted]  [big]  main
bundle.js.map  896 kB       0  [emitted]         main
  [82] ./app/index.js 456 bytes {0} [built]
 [184] ./app/HelloWorld/HelloWorld.js 2.35 kB {0} [built]
    + 183 hidden modules
````

If you now open index.html, it should load our newly created bundle and display our HelloWorld react app!

### Congrats, you have successfully transpiled react code with webpack! 

# Code split

Code splitting is very common, especially between app and vendor code. In this exercise I will show how to split app code as well as vendor code.

## Split app code

If you look at entry in the webpack config you can see that we have two entries. If you run npm run build though, you will see that even though we have two entries, only one bundle is created.

The reason we only get one bundle is because we haven't given our entries any names, let's fix that.

Change:
```javascript
entry: [
  './app/HelloJayway/HelloJayway',
  './app/HelloWorld/HelloWorld',
],
```
To:
```javascript
entry: {
  jayway: './app/HelloJayway/HelloJayway',
  world: './app/HelloWorld/HelloWorld',
},
```

If you run npm run build now, webpack complains! That is because our **output.filename** is static and we can't have two bundles with the same name.

Change:
```javascript
filename: 'bundle.js',
```
To:
```javascript
filename: '[name].js',
```

In above code is **[name]** mapped to the object keys we have in entries. If you do npm run build now you should see something like this:

```html
Hash: ba89856ab6d6a8c9a87e
Version: webpack 3.7.1
Time: 1869ms
        Asset    Size  Chunks                    Chunk Names
     world.js  748 kB       0  [emitted]  [big]  world
    jayway.js  748 kB       1  [emitted]  [big]  jayway
 world.js.map  896 kB       0  [emitted]         world
jayway.js.map  896 kB       1  [emitted]         jayway
 [183] ./app/HelloJayway/HelloJayway.js 2.41 kB {1} [built]
 [184] ./app/HelloWorld/HelloWorld.js 2.4 kB {0} [built]
```

Let's update index.html to match our bundle change.

Change:
```html
<script src="build/bundle.js"></script>
```
To:
```html
<script src="build/world.js"></script>
<script src="build/jayway.js"></script>
```

That's it! Open index.html and confirm that it works :)

## Split vendor code

If you looked at the file sizes of the bundles you might have realised one problem. Both bundles contains the same vendors assets.

At the top of webpack.config, add:
```javascript
const webpack = require('webpack');
```
At the end, in the root, add:
```javascript
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks(module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
  })
],
```

As you can see above, we use the **CommonsChunkPlugin** twice, **vendor** and **manifest**. CommonsChunkPlugin is a plugin that takes modules and put them in a separate bundle.

In **vendor** we specify that we only want to include modules that is in node_modules. This way we know that it will contain all our vendors.

In **manifest** we just leave it at default. This means that it will take all code that is common between our other bundles and put it in a separate one. However, the only code that is common between our bundles now that **vendor** is in a separate bundle, is the webpack code. This is the code that knows which module is used where etc. 

The reason we want to separate the webpack code is because if we have a watcher and change our app code, the vendor bundle will be rebuilt as well because the webpack code changes.

If you do npm run build you should get something like this:

```html
Hash: 94a8f172d84ed0310f9e
Version: webpack 3.7.1
Time: 1955ms
          Asset       Size  Chunks                    Chunk Names
      vendor.js     743 kB       0  [emitted]  [big]  vendor
       world.js    2.55 kB       1  [emitted]         world
      jayway.js    2.56 kB       2  [emitted]         jayway
    manifest.js    5.81 kB       3  [emitted]         manifest
  vendor.js.map     892 kB       0  [emitted]         vendor
   world.js.map  723 bytes       1  [emitted]         world
  jayway.js.map  735 bytes       2  [emitted]         jayway
manifest.js.map    5.89 kB       3  [emitted]         manifest
  [83] ./app/HelloJayway/HelloJayway.js 2.41 kB {2} [built]
 [184] ./app/HelloWorld/HelloWorld.js 2.4 kB {1} [built]
    + 183 hidden modules
```

Let's update index.html to try it out.

Change:
```html
<script src="build/world.js"></script>
<script src="build/jayway.js"></script>
```
To:
```html
<script src="build/manifest.js"></script>
<script src="build/vendor.js"></script>
<script src="build/world.js"></script>
<script src="build/jayway.js"></script>
```

The important thing to remember here is that the **manifest** has to be loaded first, otherwise the code will fail.

Open index.html and confirm that it still works.

That's it! You now know how to code split in webpack.
# Transpile postcss

In this exercise we continue where we left of in transpile-react. Start by running 'npm install'.

## Css modules setup

To use css in webpack, regardless if it is sass, postcss or whatever, you probably want to use the css and style loaders. So lets start by adding those.

````text
npm install --save-dev css-loader style-loader
````

In webpack.config add following in rules:
```javascript
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]',
      }
    },
  ]
}
```
#### Use
This time we give the **use** prop an array. A webpack rule can have multiple loaders (transpilers). Webpack starts with the last loader and ends with the first.

#### Options
As you can see we also give the css loader some options. You might be wondering why we didn't give the babel loader any options earlier. That's because the babel loader automatically looks for the .babelrc config file. But you can have the babel config inlined in the loader as well.

#### Css modules
**Modules** here means that we want to use css-modules. Css modules scopes the css classes so you don't have to use BEM or something like that.

**localIdentName** is how we want our class names to look. **[name]** is the file name, **[local]** is the class name and the hash is just something random that makes the class name unique. In production you would only want the hash part.

### Add our css/react code

1. In app/HelloWorld/HelloWorld.css add
```css
.cool {
  color: chocolate;
}
```
2. In the HelloWorld.js file, at the top add 
```javascript
import styles from './HelloWorld.css';
```
3. On the h1 tag add 
````javascript
className={ styles.cool }
````

### Lets try it out

Run our webpack config with 'npm run build' and open the index.html file. <br>
If you inspect the element you should see a class looking something like **HelloWorld__cool--NqzBl**.

## Post css setup

So css modules is cool and all. But you probably want sass or something like that. I'm gonna use postcss in my example because its best in my opinion, but the setup is pretty much the same thing with less/sass.

The difference between postcss and for example sass is that with sass you get a full treasure chest while in postcss you handpick which treasures you want with postcss modules.

### Install postcss

There is a lot of postcss modules and you can read more about them here: https://github.com/postcss/postcss. I'm gonna use **postcss-cssnext** and **postcss-nested** in this example so lets install those and the **postcss-loader** webpack needs as well.

```text
npm i --save-dev postcss-cssnext postcss-nested postcss-loader
```

Create a file **postcss.config.js** in this folder and add:
````javascript
module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-cssnext')({
      browsers: ['> 5%'],
      features: {
        customProperties: {
          variables: {
            brandPrimary: '#0072ad',
          },
        },
      }
    }),
  ]
};
````

Cssnext is a collection of postcss modules that enables css4 syntax, as far as it is possible with transpiling.

Here we pass some arguments down to these sub-modules. 
We can pass browser support directly in the root and below a variable to the custom properties module.

### Setup webpack

Change the css rule to a pcss rule, so we get a bit better editor support.

In the options section, add:
```text
importLoaders: 1,
```
The css-loader needs to know that we are using other loaders before it for some reason.

After the css-loader, add our postcss-loader:
````javascript
{
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  }
},
````

The postcss-loader will automatically look for **postcss.config.js** just like babel-loader looks for .babelrc.

### Lets try it out!

Change the extension of **HelloWorld.css** to **.pcss** and replace the content with:

```css
:root {
  --brandSecondary: #a0589e;
}

.root {
  border-bottom: 1px solid var(--brandPrimary);

  h1 {
    color: var(--brandSecondary);
  }
}
```

As you can see here, we use brandPrimary from the **postcss.config.js** file, which can be good since it is dynamic with js. We also have the css4 functionality to declare cariables in :root.

In **HelloWorld.js**
1. Update the import to .pcss
2. Remove className on the h1 tag
3. Add className={ styles.root } to the div

Build webpack, open index.html and confirm that the new colors work.

#### That's it!

I know that the result is kinda boring... But feel free to mess around with the css and different postcss modules :)

## TODO: add import support
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
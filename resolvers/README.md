# Resolvers

Webpack has some resolvers that makes our life a lot easier when importing modules. You can probably manage without proper resolving in a small project, but the bigger it gets the more important it is.

I have made the folder structure in this exercise look a bit more like a real project in order to show the point with resolvers.

In the root folder we now also have the folders server (made up node server) and shared. Shared contains constants and validators that is used both in the node server and the react app.

## Update webpack

If you look in app/components/HelloWorld/BarComponent you see that we import some stuff.

```javascript
import footil from '../../../utils/footil';
import TextField from '../../../elements/TextField';
import { FOO } from '../../../../shared/constants/foostant';
```

Having to write all those '../' is pretty annoying, time consuming and makes refactor harder. So let's fix that.

In the root of your webpack config add:

```javascript
resolve: {
  modules: [
    path.resolve(__dirname, 'app'),
    path.resolve(__dirname, 'shared'),
    path.resolve(__dirname, 'node_modules'),
  ],
},
```

Above means that we can import modules directly from these folders. The reason we could import React directly from node_modules in earlier exercises is because webpack resolves node_modules with the default config like this:

```javascript
resolve: {
  modules: [
    path.resolve(__dirname, 'node_modules'),
  ],
},
```

Let's update BarComponent to reflect our improved config.

Change:
```javascript
import footil from '../../../utils/footil';
import TextField from '../../../elements/TextField';
import { FOO } from '../../../../shared/constants/foostant';
```

To:
```javascript
import footil from 'utils/footil';
import TextField from 'elements/TextField';
import { FOO } from 'constants/foostant';
```

Run npm run start and go to localhost:8080 to confirm that the app still works.

As you can see in above code we don't have to include 'app' or 'shared' in our import paths. This is the way I recommend resolving imports but you can also use something called alias.

Alias is probably what you have guessed. You can point to any folder by using a specific string.

In resolve, after modules in your webpack config. Add:

```javascript
alias: {
  aliasTest: path.resolve(__dirname, 'shared/constants'),
},
```

In BarComponent change:
```javascript
import { FOO } from 'constants/foostant';
```

To:
```javascript
import { FOO } from 'aliasTest/foostant';
```

Restart webpack and confirm that the app still works.

The main reason that I prefer modules is because we can import directly from all sub-directories instead of just the one that an alias points at.
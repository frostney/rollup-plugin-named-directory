# rollup-plugin-named-directory
Provide shortcuts for your modules

In most projects we will reach this point where we use directories to logically structure our JavaScript files. Let's take a look at this example:
```
.
├── Button
│   ├── Button.js
│   ├── Caption.js
│   └── Icon.js
...
```

In this scenario, `Button` is the module you would want to use most of the time. `Caption` and `Icon` are only being used inside of the scope of the `Button` file.

Whenever you want to require a module from a file in a directory you will have two choices to import these files:
1. Import the files directly like this `import Button from './Button/Button'`. Since it this case `Caption` and `Icon` should only be used for the scope for `Button`. We could strive for shorter import statement that would create the illusion of stronger coupling.
2. Create an `index.js` file for each directory and mimic Node.js resolution behavior. While this shortens the import statement to `import Button from './Button'` increasing the coupling and decreasing moving parts, it creates additional files to maintain.

Ideally, we would want short import statements without the need to create additional files that link to the file in question. And this is where `rollup-plugin-named-directory` comes in.

If you have been using Webpack before, this plugin is similar to https://github.com/shaketbaby/directory-named-webpack-plugin.

## Usage
```javascript
import namedDirectory from 'rollup-plugin-named-directory';

rollup({
  plugins: [
    namedDirectory()
  ]
})
```

### Options
#### `matchers`
Default value: `['<dir>/<dir>.js']`

Whenever Rollup encounters `<dir>`, it will now look for `<dir>/<dir>.js` first. (Example: If the directory is `Button`, it will now look for `Button/Button.js` first)
If the plugin isn't able to find the file in question, it will continue with the typical resolution behavior as dictated by Rollup and other plugins.

Make sure to provide the file extensions in.

It's possible to provide multiple strings which will be resolved in the order they have been defined.

```javascript
namedDirectory({
  matchers: ['<dir>CustomSuffix.js', '<dir>/<dir>.js']
})
```

#### `filter`
Allows to provide an optional filter function that will be called on each potential match from the `matchers` array.
Default value: `() => false`

```javascript
namedDirectory({
  filter: (name: string): boolean => {
    // Name provides the relative path to the expanded module
    // ./files/Button/Button.js
  }
})
```

## License

MIT

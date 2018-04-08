# rollup-plugin-named-directory
Resolves modules to its directory names

If you have been using Webpack before, this plugin is similar to https://github.com/shaketbaby/directory-named-webpack-plugin.

## Usage
```javascript
import namedDirectory from 'rollup-plugin-named-directory';

rollup({
  plugins: [
    namedDirectory(['*.js'])
  ]
})
```

## License

MIT
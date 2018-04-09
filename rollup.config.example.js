import babel from 'rollup-plugin-babel';
import namedDirectory from './src/index';

export default {
  input: 'example/index.js',
  output: {
    format: 'cjs',
    file: 'example/build.js',
  },
  plugins: [babel(), namedDirectory()],
};

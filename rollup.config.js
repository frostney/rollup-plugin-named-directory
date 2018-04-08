import babel from 'rollup-plugin-babel';

export default ['es', 'cjs'].map(format => ({
  input: 'src/index.js',
  output: {
    format,
    file: `dist/named-directory.${format}.js`,
  },
  plugins: [babel()],
  external: ['fs', 'path'],
}));


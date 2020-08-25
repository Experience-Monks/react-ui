import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import svg from 'rollup-plugin-svg';
import external from 'rollup-plugin-peer-deps-external';

function configure(file) {
  return {
    ...file,
    sourcemap: true,
    globals: {
      react: 'React'
    }
  };
}

export default {
  input: './src/index.js',
  output: [
    { file: 'dist/index.js', format: 'cjs', name: 'ReactUI' },
    { file: 'dist/index.module.js', format: 'es' }
  ].map(configure),
  plugins: [
    postcss(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    svg(),
    external({
      includeDependencies: true
    })
  ],
  external: ['react']
};

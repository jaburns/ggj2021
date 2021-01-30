import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'build/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    name: 'ggj2021',
  },
  plugins: [
    commonjs(),
    resolve(),
  ],
};
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: 'test/index.js',
  output: {
    file: 'test/dist.js',
    format: 'cjs'
  },
  watch: {},
  plugins: [
    json(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: !!process.env.npm_config_open,
      openPage: '/index.html',
      contentBase: ['test'],
      host: 'localhost',
      port: 9091
    })
  ]
}

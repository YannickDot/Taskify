import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import butternut from 'rollup-plugin-butternut'

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
    // butternut()
  ],
  dest: 'index.js'
}

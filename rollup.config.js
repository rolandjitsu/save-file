const camelCase = require('camelcase');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');
const {uglify} = require('rollup-plugin-uglify');

const pckg = require('./package.json');
const name = pckg.name;
const input = pckg.module;

const plugins = [
    resolve(),
    commonjs(),
    sourcemaps()
];

const output = {
    format: 'umd',
    name: camelCase(name),
    // The key here is library name,and the value is the the name of the global variable name the window object.
    // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.
    globals: {
        // TS
        // 'tslib': 'tslib'
    },
    sourcemap: true
};

// List of dependencies
// See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
const external = [
    // TS
    // 'tslib'
];

export default [{
    input,
    plugins,
    external,
    output: {
        ...output,
        file: distPath(`${name}.umd.js`)
    }
},
{
    input,
    plugins: [
        ...plugins,
        uglify()
    ],
    external,
    output: {
        ...output,
        file: distPath(`${name}.umd.min.js`)
    }
}];

function distPath(file) {
    return `./dist/bundles/${file}`;
}

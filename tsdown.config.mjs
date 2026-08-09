import {defineConfig} from 'tsdown';

const shared = {
  entry: ['src/index.ts'],
  platform: 'browser',
  target: 'es2019',
  sourcemap: true
};

export default defineConfig([
  // ESM (import) + CommonJS (require) for bundlers and Node, plus declarations.
  {
    ...shared,
    format: ['es', 'cjs'],
    dts: true
  },
  // Minified UMD for CDN/<script> usage; exposes the `saveAsFile` global.
  {
    ...shared,
    format: ['umd'],
    globalName: 'saveAsFile',
    minify: true,
    dts: false,
    outputOptions: {
      entryFileNames: '[name].min.js'
    }
  }
]);

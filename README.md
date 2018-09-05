# File Saver

> A simple fn to save a file to disk.

[![Travis (.org) branch](https://img.shields.io/travis/rolandjitsu/save-file/master.svg?style=flat-square)](https://github.com/rolandjitsu/save-file)


# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Browser Support](#browser-support)
* [Contribute](#contribute)


### Installation
----------------
You can install this package from [NPM](https://www.npmjs.com):
```bash
npm add save-file
```

Or with [Yarn](https://yarnpkg.com/en):
```bash
yarn add save-file
```

#### CDN
For CDN, you can use [unpkg](https://unpkg.com):

[https://unpkg.com/save-file/dist/bundles/save-file.umd.min.js](https://unpkg.com/save-file/dist/bundles/save-file.umd.min.js)

The global namespace for save-file is `saveFile`:
```js
const json = JSON.stringify({ping: true});
const file = new File([json], {type: 'application/json'});
saveFile(file, 'test.json');
```


### Usage
---------

#### ES6
Save a File to disk:
```ts
import saveFile from 'save-file';
const json = JSON.stringify({ping: true});
const file = new File([json], {type: 'application/json'});
saveFile(file, 'test.json');
```

#### CommonJS
Save a File to disk:
```ts
const saveFile = require('save-file');
const json = JSON.stringify({ping: true});
const file = new File([json], {type: 'application/json'});
saveFile(file, 'test.json');
```


### Browser Support
-------------------
You can expect this lib to run wherever the href [download](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Browser_compatibility) attribute is supported.


### Contribute
--------------
If you wish to contribute, please use the following guidelines:
* Use [Conventional Commits](https://conventionalcommits.org)
* Use `[ci skip]` in commit messages to skip a build

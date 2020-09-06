# File Saver

> A simple fn to save a file to disk.

[![npm](https://img.shields.io/npm/v/save-file.svg?style=flat-square)](https://www.npmjs.com/package/save-file)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rolandjitsu/save-file/Test?label=tests&style=flat-square)](https://github.com/rolandjitsu/save-file/actions?query=workflow%3ATest)
[![Coveralls github branch](https://img.shields.io/coveralls/github/rolandjitsu/save-file/master?style=flat-square)](https://coveralls.io/github/rolandjitsu/save-file?branch=master)


# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Browser Support](#browser-support)
* [Contribute](#contribute)


### Installation
----------------
You can install this package from [NPM](https://www.npmjs.com):
```bash
npm add save-as-file
```

Or with [Yarn](https://yarnpkg.com/en):
```bash
yarn add save-as-file
```

#### CDN
For CDN, you can use [unpkg](https://unpkg.com):

[https://unpkg.com/save-as-file/dist/bundles/save-as-file.umd.min.js](https://unpkg.com/save-as-file/dist/bundles/save-as-file.umd.min.js)

The global namespace for save-as-file is `saveAsFile`:
```js
const json = JSON.stringify({ping: true});
const file = new File([json], {type: 'application/json'});
saveAsFile(file, 'test.json');
```


### Usage
---------

#### ES6
Save a File to disk:
```ts
import saveFile from 'save-as-file';
const json = JSON.stringify({ping: true});
const file = new File([json], {type: 'application/json'});
saveFile(file, 'test.json');
```

**NOTE**: We create a temporary data uri for File/Blob objects which we revoke after 1 minute.
If you need to download a large file which may take longer than 1 minute to download,
use the 3rd argument to increase this timeout:

```ts
import saveFile from 'save-as-file';
const json = JSON.stringify({ping: true});
const file = new File([json], {type: 'application/json'});
saveFile(file, 'test.json', 1000 * 60 * 10 /* 10 mins */);
```

#### CommonJS
Save a File to disk:
```ts
const saveFile = require('save-as-file');
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

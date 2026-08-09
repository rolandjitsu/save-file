# save-as-file

> A simple fn to save a file to disk.

[![npm](https://img.shields.io/npm/v/save-as-file.svg?style=flat-square)](https://www.npmjs.com/package/save-as-file)
[![CI](https://img.shields.io/github/actions/workflow/status/rolandjitsu/save-file/ci.yml?branch=master&label=ci&style=flat-square)](https://github.com/rolandjitsu/save-file/actions/workflows/ci.yml)
[![Coveralls Github Branch](https://img.shields.io/coveralls/github/rolandjitsu/save-file/master?style=flat-square)](https://coveralls.io/github/rolandjitsu/save-file?branch=master)

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Browser Support](#browser-support)
- [Contribute](#contribute)

### Installation

---

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

[https://unpkg.com/save-as-file/dist/index.min.js](https://unpkg.com/save-as-file/dist/index.min.js)

The global namespace for save-as-file is `saveAsFile`:

```html
<script src="https://unpkg.com/save-as-file/dist/index.min.js"></script>

<script>
    const json = JSON.stringify({ping: true});
    const file = new File([json], 'test.json', {type: 'application/json'});
    saveAsFile(file, 'test.json');
</script>
```

### Usage

---

#### ES6

Save a File to disk:

```ts
import saveFile from 'save-as-file';
const json = JSON.stringify({ping: true});
const file = new File([json], 'test.json', {type: 'application/json'});
saveFile(file, 'test.json');
```

Since a `File` already carries a name, `filename` is optional for File input and
defaults to the File's own `name`:

```ts
saveFile(file); // saved as file.name
```

**NOTE**: For File/Blob objects we create a temporary object URL which we revoke after 1 minute.
If you need to download a large file which may take longer than 1 minute to download,
use the 3rd argument to increase this timeout:

```ts
import saveFile from 'save-as-file';
const json = JSON.stringify({ping: true});
const file = new File([json], 'test.json', {type: 'application/json'});
saveFile(file, 'test.json', 1000 * 60 * 10 /* 10 mins */);
```

#### CommonJS

Save a File to disk:

```ts
const saveFile = require('save-as-file');
const json = JSON.stringify({ping: true});
const file = new File([json], 'test.json', {type: 'application/json'});
saveFile(file, 'test.json');
```

### API

---

```ts
saveFile(data, filename?, gcTimeout?): void
```

| Param       | Type                     | Default     | Description                                                                               |
| ----------- | ------------------------ | ----------- | ----------------------------------------------------------------------------------------- |
| `data`      | `File \| Blob \| string` | -           | The File/Blob to save, or an existing object URL string.                                  |
| `filename`  | `string`                 | `data.name` | Name to save the file as. Optional for File input; defaults to the File's own `name`.     |
| `gcTimeout` | `number`                 | `60000`     | Milliseconds to wait before revoking a created object URL. Only used for File/Blob input. |

### Browser Support

---

You can expect this lib to run wherever the [`download`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#browser_compatibility)
attribute of an `<a>` element is supported. See the `browserslist` field in `package.json` for
the full support matrix.

### Contribute

---

See [AGENTS.md](./AGENTS.md) for the full workflow and conventions. In short:

```bash
npm ci                # install dependencies
npm run lint          # oxlint
npm run format        # prettier
npm run typecheck     # tsc (TypeScript 7)
npm run build         # tsdown
npm test              # vitest
```

- Use [Conventional Commits](https://www.conventionalcommits.org).
- Every change ships with tests; keep coverage from dropping.

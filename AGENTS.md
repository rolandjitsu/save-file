# AGENTS.md

Guidance for AI coding agents in this repo. Human contributors: see the
[Contribute](./README.md#contribute) section of the README.

This is `save-as-file`: a single default-exported function, `saveFile`, that saves a File/Blob
(or an existing object URL) to disk via the HTML5 `download` attribute. It is a small,
dependency-free, published npm library. Keep it that way; think twice before adding a runtime
dependency.

The toolchain is the Rust-based oxc stack: [oxlint](https://oxc.rs/) to lint,
[Prettier](https://prettier.io/) to format, [tsdown](https://tsdown.dev/) (Rolldown + oxc) to
build, and [Vitest](https://vitest.dev/) to test. Type-checking is [TypeScript 7](https://www.typescriptlang.org/)
(the native `tsc`). There is no Babel, tslint, ts-jest, or Rollup; do not reintroduce them.

## Workflow

- Clarify the design before implementing. For anything non-trivial, agree on the approach first.
- One unit of change per commit. Never mix unrelated changes. Present the change for review
  before committing.
- Every change ships with tests. Run local CI before calling it done, and do not claim it passes
  without running it.
- Verify against the code and the tools: read before you answer, run before you assert.

Local CI (must be green before review):

```shell
npm run lint          # oxlint
npm run format:check  # prettier
npm run typecheck     # tsc --noEmit (TypeScript 7)
npm run build         # tsdown
npm run test:cov      # vitest
```

## Writing: code, comments, docs, commits

- Concise and to the point. No fluff. Explain the non-obvious; do not narrate the obvious.
- ASCII only. No em-dash and no `--`; write `-`. Use `->` not the arrow glyph, `!=` not the
  not-equal glyph, and so on.
- Comments justify _why_, not _what_. Delete any comment that restates the code.
- Formatting is not a matter of taste: Prettier owns it. Run `npm run format` rather than
  hand-formatting. House style (`.prettierrc.json`) is single quotes, no trailing commas, no
  bracket spacing, and arrow parens omitted when possible.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/). Write the subject in the present
  tense, imperative voice: `feat: add retry option`, not `added` or `adds`. semantic-release
  derives the next version and changelog from these, so the type prefix matters.
- Keep the body minimal, or omit it. A good subject plus the diff is usually enough; add a body
  only for what the code cannot show (why, a trade-off, a non-obvious consequence). Never restate
  the change or narrate the diff.
- Disclose AI with an `Assisted-by: Claude:claude-opus-4-8` trailer. Never `Co-Authored-By`, and
  never add a human's `Signed-off-by`.

## Tests

- Tests live beside the source as `src/*.test.ts` and run under Vitest with the jsdom environment.
- jsdom does not implement the object-URL methods; `vitest.setup.js` stubs `URL.createObjectURL`
  and `URL.revokeObjectURL` so tests can spy on them.
- `saveFile` is timer- and frame-driven. Use `vi.useFakeTimers()` to assert the deferred
  `revokeObjectURL`, and await a real `requestAnimationFrame` to assert the click dispatch. Do
  not reach for a mocking library beyond `vi`.
- Coverage must not drop. New code ships with tests that hold or raise it. Measure with
  `npm run test:cov`.

## Code conventions

- Source is TypeScript ESM (`import`/`export`) in `src`. The published API is exactly the default
  export re-exported by `src/index.ts`.
- Declarations are generated, not hand-written. The build relies on `isolatedDeclarations`
  (enabled in `tsconfig.json`) so oxc emits the `.d.ts` without invoking the type-checker; this
  means every exported symbol needs an explicit type (for example `saveFile`'s `: void` return).
  Keep exports isolated-declarations-clean or the build breaks.

## Build and publish

- `npm run build` bundles `src` with tsdown into `dist/`: ESM (`index.mjs`), CommonJS
  (`index.js`), a minified UMD (`index.min.js`, global `saveAsFile`), and declarations. What ships
  to npm is the `files` allowlist in `package.json`; keep it accurate.
- Do not hand-edit anything in `dist/` - it is generated.

## Browser support

- The support matrix is the `browserslist` field in `package.json`; it also documents the intent
  behind the build `target` in `tsdown.config.mjs`. Keep the two consistent.
- The runtime need is the `<a download>` attribute plus `Blob`/`URL.createObjectURL`. Do not
  silently narrow or widen support; changing it is a deliberate change and the README "Browser
  Support" section must match.

## CI workflows

- GitHub Actions live in `.github/workflows`. Write the workflow `name:`, every job name, and
  every named step in Sentence case.
- Keep workflows minimal and scoped to one purpose; prefer the built-in `GITHUB_TOKEN` over a
  personal access token. Publishing is npm trusted publishing over OIDC (no `NPM_TOKEN`).

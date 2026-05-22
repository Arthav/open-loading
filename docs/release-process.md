# Release Process

Use this checklist when publishing `@arthav/open-loading`. The root workspace stays private; only `packages/core` is published.

## Before Publishing

1. Confirm the public package version in `packages/core/package.json`.
2. Move completed changelog items from `Unreleased` to the target version.
3. Update draft release notes under `docs/releases/`.
4. Confirm package metadata points at the intended public repo:
   - root `package.json`
   - `packages/core/package.json`
   - README install and repository examples

## Local Gate

Run the full release gate from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm pack:core
pnpm smoke:core-tarball
```

`pnpm pack:core` must show `dist/styles.css`, loader JavaScript, loader type declarations, registry files, and `README.md`. It should not include gallery source, screenshots, coverage output, logs, or temporary QA files.

`pnpm smoke:core-tarball` must pack the current package, install it into a temporary consumer app, typecheck public imports, build with Vite, import `@arthav/open-loading/styles.css`, and server-render every registered loader.

## Publish

Publish only from `packages/core`:

```bash
cd packages/core
npm publish --access public
```

Do not publish from the repository root.

## After Publishing

1. Install the published package in a clean app and render at least `ThinkingOrbit`, `ButtonHold`, `DataTableSkeleton`, `FileImportStack`, and `ErrorRetry`.
2. Create a GitHub release with the matching notes from `docs/releases/`.
3. Tag the commit with the same package version.
4. Confirm the gallery examples and README still match the published package.

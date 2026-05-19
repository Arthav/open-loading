# Loader Template

Use this folder as the starting point for one new loader.

Required edits:

- Rename `LoaderName.tsx`.
- Rename `LoaderName.test.tsx`.
- Replace `loader.definition.ts` values with specific metadata.
- Export the component from `packages/core/src/loaders/index.ts`.
- Add the metadata object to `packages/core/src/registry/definitions.ts`.
- Run `pnpm validate`, `pnpm typecheck`, `pnpm test:run`, and `pnpm build`.

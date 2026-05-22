# PLAN_PROGRESS.md

Progress notes for continuing work on `PLAN.md`.

## 2026-05-21 Session

### Scope

Worked on Phase 0 from `PLAN.md`: stabilize the current v0 before adding new loaders.

### Completed

- Fixed `ProgressPulse` so it no longer displays fake determinate progress copy.
- Added a style source export in code and a build step that writes `dist/styles.css`.
- Added a public package export for `@arthav/open-loading/styles.css`.
- Changed automatic loader styles to use a client-side singleton injection path instead of rendering repeated style tags for every loader instance.
- Documented the explicit stylesheet import in the root README and package README.
- Added `CHANGELOG.md` with the current unreleased changes.
- Added `pnpm pack:core` to CI after `pnpm check`.
- Added focused tests for singleton style injection and non-determinate `ProgressPulse` copy.
- Added routeable gallery pages for individual loaders at `/gallery/:loaderId`.
- Added issue templates for loader requests, accessibility issues, bug reports, and docs issues.
- Added minimal Vite React and Next.js App Router consumer examples.
- Documented gallery routes, framework examples, and issue-template usage.
- Added `RouteReveal`, a page-level loader for route transitions and dashboard initialization.
- Added registry-to-component consistency tests covering exported component names, default preview copy, live-region metadata, reduced motion, and error support metadata.
- Changed non-error loaders to ignore unsupported `error` props instead of switching into error announcement mode.
- Aligned `ErrorRetry` default component copy with registry `previewMessage`.
- Added a loader decision guide with "when not to use this" guidance for each category.
- Added a visual QA checklist for gallery route, mobile, reduced-motion, error, and package checks.
- Added `ButtonHold`, a compact button-level loader for submit buttons and toolbar actions.
- Added internal `layout="inline"` support to `LoaderFrame` so compact loaders can keep stable button-like dimensions without changing public `LoaderProps`.
- Added `DataTableSkeleton`, a table-specific skeleton loader for admin lists and query results.
- Added `EmptySearch`, a search-to-empty loader for filters, query results, and first-run checks.
- Added `ToolCallTrace`, an AI tool-call loader for agent workflows actively using tools.
- Added `FileImportStack`, a file-import loader for parsing, validating, and saving uploaded rows.
- Added `pnpm smoke:core-tarball`, a repeatable tarball consumer smoke check for Vite build, TypeScript imports, registry lookups, stylesheet import, and SSR rendering.
- Added `pnpm smoke:core-tarball` to CI after package dry-run verification.
- Added a release process checklist and draft `@arthav/open-loading@0.1.1` release notes.

### Touched Files

- `.github/workflows/ci.yml`
- `.github/ISSUE_TEMPLATE/*`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `README.md`
- `apps/gallery/src/App.css`
- `apps/gallery/src/App.test.tsx`
- `apps/gallery/src/App.tsx`
- `examples/vite-react/*`
- `examples/next-app-router/*`
- `docs/loader-decision-guide.md`
- `docs/release-process.md`
- `docs/releases/0.1.1.md`
- `docs/visual-qa-checklist.md`
- `packages/core/README.md`
- `packages/core/package.json`
- `packages/core/scripts/write-styles.mjs`
- `packages/core/scripts/smoke-tarball-consumer.mjs`
- `packages/core/src/loaders/common.tsx`
- `packages/core/src/loaders/ButtonHold.tsx`
- `packages/core/src/loaders/DataTableSkeleton.tsx`
- `packages/core/src/loaders/EmptySearch.tsx`
- `packages/core/src/loaders/ErrorRetry.tsx`
- `packages/core/src/loaders/FileImportStack.tsx`
- `packages/core/src/loaders/ProgressPulse.tsx`
- `packages/core/src/loaders/RouteReveal.tsx`
- `packages/core/src/loaders/SimpleSpinner.tsx`
- `packages/core/src/loaders/SkeletonWave.tsx`
- `packages/core/src/loaders/TypingDots.tsx`
- `packages/core/src/loaders/ToolCallTrace.tsx`
- `packages/core/src/loaders/loaders.test.tsx`
- `packages/core/src/loaders/styles.tsx`
- `packages/core/src/registry/definitions.ts`
- `packages/core/src/registry/registry.test.ts`

### Verification

- `pnpm check` passed.
- `pnpm pack:core` passed after allowing npm to use its cache outside the workspace.
- Dry-run tarball includes `dist/styles.css`.
- Dry-run tarball keeps gallery source out of the published package.
- Vite served `/gallery/queue-beacon` with a `200` response in an in-process route check.
- Vite served `/gallery/route-reveal` with a `200` response in an in-process route check.
- Vite served `/gallery/button-hold` with a `200` response in an in-process route check.
- Vite served `/gallery/data-table-skeleton` with a `200` response in an in-process route check.
- Vite served `/gallery/empty-search` with a `200` response in an in-process route check.
- Vite served `/gallery/tool-call-trace` with a `200` response in an in-process route check.
- Vite served `/gallery/file-import-stack` with a `200` response in an in-process route check.
- `pnpm smoke:core-tarball` passed after packing the package into a temporary consumer app, installing from the tarball, typechecking, building with Vite, and server-rendering every loader.
- `pnpm install --frozen-lockfile` passed as part of the release gate.
- `pnpm check` passed after the release-doc and CI updates.
- `pnpm pack:core` passed after the release-doc and CI updates.
- `pnpm smoke:core-tarball` passed after the release-doc and CI updates.

### Existing Dirty Files Before This Continuation

These files were already modified before the Phase 1 continuation. The routeable-loader work extended them instead of reverting their existing changes:

- `apps/gallery/src/App.css`
- `apps/gallery/src/App.test.tsx`
- `apps/gallery/src/App.tsx`

### Next Recommended Work

- Publish and tag `@arthav/open-loading@0.1.1` when repository and npm access are ready.

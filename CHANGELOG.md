# Changelog

All notable changes to `@arthav/open-loading` will be documented here.

This project uses a simple human-readable changelog until the release process needs heavier automation.

## Unreleased

### Added

- Added an exported `@arthav/open-loading/styles.css` stylesheet path for production apps that want explicit style loading.
- Added package dry-run verification to CI with `pnpm pack:core`.
- Added direct gallery routes for individual loaders, including `/gallery/:loaderId` permalinks.
- Added GitHub issue forms for loader requests, accessibility issues, bug reports, and docs fixes.
- Added minimal Vite React and Next.js App Router consumer examples under `examples/`.
- Added `RouteReveal`, a page-level loader for route transitions and dashboard initialization.
- Added `ButtonHold`, a compact button-level loader for form submits and toolbar actions.
- Added `DataTableSkeleton`, a table-specific skeleton loader for admin lists and query results.
- Added `EmptySearch`, a search-to-empty loader for filters, queries, and first-run checks.
- Added `ToolCallTrace`, an AI tool-call loader for agent workflows that are actively using tools.
- Added `FileImportStack`, a file-import loader for parsing, validating, and saving uploaded rows.
- Added registry-to-component consistency tests for exported component names, default copy, live-region behavior, reduced motion, and error support metadata.
- Added a loader decision guide with explicit misuse guidance for each category.
- Added a visual QA checklist for gallery routes, mobile layout, reduced motion, error states, and package dry-runs.
- Added a repeatable tarball consumer smoke check for Vite build, TypeScript imports, registry lookups, stylesheet import, and SSR rendering.
- Added the tarball consumer smoke check to CI after the package dry-run.
- Added a release process checklist and draft release notes for `@arthav/open-loading@0.1.1`.

### Changed

- Changed `ProgressPulse` to use honest non-determinate helper copy instead of a fake exact progress percentage.
- Changed automatic loader styles to inject as a client-side singleton instead of rendering a repeated style tag per loader instance.
- Changed non-error loaders so unsupported `error` props do not switch them into error announcement mode.

### Verified

- Package readiness now includes `pnpm check`, `pnpm pack:core`, and `pnpm smoke:core-tarball`.

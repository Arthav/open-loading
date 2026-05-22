# PLAN.md

This plan is for turning `open-loading` from a polished v0 into a library that real React teams can install, trust, and keep using.

The blunt version: the project already has the right bones. The core package, registry metadata, gallery, loader template, CI, and contribution docs are all pointed in the right direction. What is missing is the boring production work that makes a visual library feel safe in somebody else's app: stable styling, honest APIs, stronger docs, packaging proof, visual QA, and a release loop.

## North Star

A developer should be able to install `@arthav/open-loading`, choose a loader by product situation, render it in a production React app, and know these things without reading the source:

- The loader is accessible by default.
- The loader will not leak styles into the app.
- The loader will not break SSR.
- The loader can be themed enough to fit a real product.
- The package is small, typed, tree-shakeable, and documented.
- The registry metadata is reliable enough for humans, docs, and AI agents.

For contributors, the goal is just as concrete: an agent or human should be able to add one loader from `templates/loader`, wire the registry, run the local gate, and open a PR that maintainers can review quickly.

## Current Snapshot

Observed from the repo:

- Root workspace is private and uses `pnpm`.
- `packages/core` publishes `@arthav/open-loading`.
- `apps/gallery` is a Vite gallery that imports from the core package and renders registry-driven docs.
- `packages/core/src/loaders` currently contains bundled loaders such as `ThinkingOrbit`, `SimpleSpinner`, `TypingDots`, `ProgressPulse`, `SkeletonWave`, `AIStream`, `ErrorRetry`, `NeuralGalaxy`, and `QueueBeacon`.
- `packages/core/src/registry/definitions.ts` is already treated as the metadata source of truth.
- `packages/core/src/scripts/validate-metadata.ts` exists and is wired through `pnpm validate`.
- CI runs `pnpm check`, which expands to metadata validation, typecheck, tests, and build.
- The repo already has `AGENTS.md`, `CONTRIBUTING.md`, a PR template, and `templates/loader`.

This is a solid foundation. The next work should not be random feature expansion. It should make the existing idea dependable.

## Product Principles

1. Useful beats flashy.
   Loaders should communicate what is happening, how long it might feel, and whether the user can act. Pure animation polish is secondary.

2. Metadata is part of the public API.
   `loaders`, `getLoaderById`, and every definition in `packages/core/src/registry/definitions.ts` should be treated as semver-sensitive. If agents and docs rely on it, it is not internal.

3. Accessibility is not a checkbox.
   Visible text, `role="status"`, live-region behavior, reduced-motion support, and error announcements must stay tested for every loader.

4. The gallery is not marketing fluff.
   It should work as a picker, docs site, QA surface, and contribution guide.

5. One loader per PR remains correct.
   This keeps review honest. The project should resist themed batches unless the user explicitly requests one.

6. Do not fake precision.
   A loader that says `72% complete` needs a real progress prop or should use non-determinate copy. Fake progress is worse than a spinner.

## Real Users

### React App Developer

They want to install the package, import one loader, pass a message, and move on. They need copy-paste examples for Vite, Next.js, and plain React.

### Product Engineer

They need a decision guide: when to use a spinner, skeleton, AI thinking state, queue state, upload state, or recoverable error state.

### Design-Sensitive Frontend Team

They need styling that can fit their product without forking the component. They need predictable class names, theme hooks, and no global style surprises.

### AI Coding Agent

It needs exact contribution paths, registry metadata requirements, tests, and validation commands. The existing repo is already friendly to this user; keep leaning into it.

### Maintainer

They need PRs that are easy to review, releases that are repeatable, and public package metadata that stays aligned with GitHub and npm.

## Readiness Bar

The project is real-use ready when all of these are true:

- A fresh consumer app can install `@arthav/open-loading` and render every exported loader.
- `pnpm check` passes locally and in CI.
- `pnpm pack:core` proves the package contains only intended files.
- The package works in SSR environments without `window` or DOM assumptions during render.
- Styles are deduped or intentionally imported, with documented behavior.
- Every loader has tested accessible text, live-region behavior, reduced-motion behavior, and error behavior when supported.
- The gallery has routeable docs pages and useful examples, not just visual cards.
- README examples match the actual exports.
- The package has a changelog and a repeatable release process.

## Workstream 1: Core Package Hardening

Primary files:

- `packages/core/src/types.ts`
- `packages/core/src/loaders/common.tsx`
- `packages/core/src/loaders/styles.tsx`
- `packages/core/src/loaders/index.ts`
- `packages/core/src/index.ts`
- `packages/core/package.json`

### Tasks

1. Audit `LoaderProps`.
   Decide which props are genuinely stable for v1. The current shared props are a good start: `message`, `error`, `size`, `tone`, `reducedMotion`, and `className`.

2. Add only props that solve real usage gaps.
   Strong candidates:
   - `label` for accessible names when visible message is not enough.
   - `submessage` for contextual helper copy controlled by the consumer.
   - `progress` only if determinate loaders will display actual progress.

3. Fix non-determinate progress language.
   `ProgressPulse` currently hardcodes `72% complete`. That is not acceptable for real apps unless the component accepts a real `progress` value. Either add a proper progress API or change the submessage to non-determinate copy.

4. Make style delivery explicit.
   Current loaders render `OpenLoadingStyles` through `LoaderFrame`. That is convenient, but it may duplicate style tags when many loaders render. Choose one of these approaches:
   - Keep automatic styles, but dedupe injection.
   - Export a CSS file and document `import "@arthav/open-loading/styles.css"`.
   - Support both, with one documented as preferred.

5. Confirm tree-shaking.
   The package has `sideEffects: false`, which is good. Verify that importing `SimpleSpinner` does not force all loader code into a consumer bundle.

6. Confirm SSR safety.
   Components should not touch `window`, `document`, or browser APIs during render.

7. Keep class names namespaced.
   Continue using the `ol-` prefix. Do not introduce generic class names like `.spinner`, `.message`, or `.stage`.

### Acceptance Criteria

- All exported loaders render in a minimal Vite app.
- All exported loaders render in a minimal Next.js page.
- No duplicated style tags or the duplication is intentionally documented and measured.
- `pnpm check` and `pnpm pack:core` pass.

## Workstream 2: Accessibility and Motion

Primary files:

- `packages/core/src/loaders/loaders.test.tsx`
- `packages/core/src/loaders/common.tsx`
- `packages/core/src/loaders/styles.tsx`
- `packages/core/src/registry/definitions.ts`

### Tasks

1. Expand loader tests.
   Each loader should be covered for:
   - default message
   - custom message
   - `role="status"`
   - `aria-live`
   - accessible name
   - `data-reduced-motion`
   - error behavior when `supportsError` is true

2. Add registry-to-component consistency tests.
   If metadata says `supportsError: false`, the gallery should disable error controls and tests should confirm that component behavior matches the metadata.

3. Add reduced-motion CSS assertions.
   The current styles include `data-reduced-motion` and `prefers-reduced-motion`. Keep that behavior under test where practical.

4. Make error semantics sharper.
   Error-capable loaders should use assertive announcements only when there is actually an error. Normal loading should remain polite.

5. Consider adding `jest-axe` or equivalent.
   Do this only if the dependency pays for itself. The current project is small, so focused Testing Library checks may be enough for now.

### Acceptance Criteria

- Every loader has focused accessibility tests.
- Registry metadata cannot drift far from component behavior.
- Reduced motion remains a required test path for every new loader.

## Workstream 3: Loader Catalog That Solves Real Problems

Primary files:

- `packages/core/src/loaders`
- `packages/core/src/registry/definitions.ts`
- `packages/core/src/loaders/index.ts`
- `templates/loader`

### Catalog Gaps

Current coverage is strongest for AI-thinking, inline, skeleton, upload-like, error, experimental, and waiting-room states. The next useful loaders should fill real product gaps rather than add more visual variations.

Priority additions:

1. Page loader.
   A full-page or section-level loader for route transitions and dashboard initialization.

2. Empty state loader.
   A loading-to-empty pattern for search, filters, and first-run states.

3. Button loader.
   A compact loader with stable inline dimensions for form submits and toolbar actions.

4. Data table loader.
   A skeleton tuned for tables, not generic cards.

5. File import loader.
   A loader that clearly communicates parsing, validating, and importing.

6. AI tool-call loader.
   A loader for agentic workflows where the system is calling tools, not just thinking.

### Rules

- Add one loader per PR.
- Start from `templates/loader`.
- Metadata must include concrete `useCases`, not vague words like `general`.
- Do not add loaders only because they look cool.
- Prefer a useful low-complexity loader over a cinematic high-complexity one.

### Acceptance Criteria

- Each major `LoaderType` has at least one stable loader.
- Experimental loaders are clearly marked experimental in metadata and docs.
- Gallery category counts make the catalog feel complete instead of accidental.

## Workstream 4: Gallery as Product Surface

Primary files:

- `apps/gallery/src/App.tsx`
- `apps/gallery/src/App.css`
- `apps/gallery/src/App.test.tsx`
- `docs/concepts/open-loading-cinematic.png`

### Tasks

1. Keep the cinematic stage-first layout.
   The current visual direction is right for this repo. Do not collapse it into a generic SaaS grid.

2. Add stable per-loader routes.
   Example target:
   - `/gallery/thinking-orbit`
   - `/gallery/simple-spinner`
   - `/gallery/queue-beacon`

   This makes loaders linkable from docs, issues, examples, and release notes.

3. Add a decision guide.
   The gallery should help users choose based on product promise:
   - "The user is waiting for a chat reply"
   - "The app is uploading context"
   - "The request failed but can retry"
   - "The user is in a queue"

4. Add real copy snippets per loader.
   The code tab already exists. It should stay accurate as props evolve.

5. Add package install and version visibility.
   Users should know what package name and version they are looking at.

6. Add visual regression checks.
   At minimum, use Playwright screenshots for key routes and reduced-motion mode before major releases.

7. Preserve mobile quality.
   The gallery needs explicit QA at narrow widths. Controls, stage, inspector, and nav should not overlap.

### Acceptance Criteria

- A user can link directly to a loader.
- A user can choose a loader by use case without understanding the internal categories.
- The gallery still feels spacious and stage-first.
- Gallery tests cover routing, selection, controls, code snippets, and category behavior.

## Workstream 5: Documentation and Examples

Primary files:

- `README.md`
- `packages/core/README.md`
- `CONTRIBUTING.md`
- `AGENTS.md`
- `templates/loader/README.md`
- future `examples/*`

### Tasks

1. Split docs by audience.
   Root README should sell the project and explain the workspace. Package README should serve npm users.

2. Add framework examples.
   Minimum useful set:
   - Vite React
   - Next.js App Router
   - Button pending state
   - Page transition state
   - AI chat reply state
   - Error retry state

3. Document styling.
   Users need to know whether styles are automatic, imported, deduped, themeable, or all of the above.

4. Document theming.
   Explain `tone`, `className`, CSS variables, and any supported theme boundary.

5. Document the registry as an API.
   Show how to build a picker from `loaders`, `getLoaderById`, and `getLoadersByCategory`.

6. Add "When not to use this" guidance.
   This is where the project can be genuinely better than most loader libraries. Every loader should explain misuse cases.

7. Add an agent contribution walkthrough.
   The repo already has the ingredients. Turn them into a short path:
   - copy template
   - rename files
   - add metadata
   - export component
   - add tests
   - run checks

### Acceptance Criteria

- A new user can install and render a loader from README alone.
- A contributor can add a loader without reverse-engineering the repo.
- Docs explain tradeoffs, not just props.

## Workstream 6: Release and Package Discipline

Primary files:

- `package.json`
- `packages/core/package.json`
- `pnpm-lock.yaml`
- `.github/workflows/ci.yml`
- future `CHANGELOG.md`

### Tasks

1. Add `CHANGELOG.md`.
   Use a simple human-readable format. Do not overbuild release tooling early.

2. Align version communication.
   Root package is private and can stay private. Public version communication should center on `packages/core/package.json`.

3. Add CI pack verification.
   CI already runs `pnpm check`. Add `pnpm pack:core` for package-facing confidence.

4. Verify package contents.
   The `files` field currently includes `dist` and excludes tests. Keep checking that npm tarballs do not include source junk, gallery code, screenshots, logs, or local artifacts.

5. Decide release process.
   Minimum viable process:
   - merge to `main`
   - update package version and changelog
   - run `pnpm check`
   - run `pnpm pack:core`
   - publish from `packages/core`
   - create GitHub release notes

6. Add npm provenance later if useful.
   Do not block v1 on this, but it is worth adding once releases are routine.

### Acceptance Criteria

- A maintainer can publish without guessing.
- Package tarball contents are reviewed before publish.
- CI catches broken metadata, types, tests, builds, and packaging mistakes.

## Workstream 7: Quality Gates

The local gate remains:

```bash
pnpm check
```

For package-facing changes:

```bash
pnpm pack:core
```

Before a release, the full gate should be:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm pack:core
```

Add visual QA when the gallery changes:

- Desktop gallery route.
- Mobile gallery route.
- Docs route.
- API route.
- Use-cases route.
- At least one reduced-motion preview.
- At least one error-mode preview.

## Workstream 8: Community and Contribution Loop

Primary files:

- `.github/pull_request_template.md`
- future `.github/ISSUE_TEMPLATE/*`
- `CONTRIBUTING.md`
- `templates/loader`

### Tasks

1. Add issue templates.
   Useful templates:
   - loader request
   - bug report
   - accessibility issue
   - docs issue

2. Add a loader request format.
   Ask for:
   - use case
   - expected wait duration
   - whether it needs error support
   - whether it needs progress
   - examples from real products

3. Label contribution difficulty.
   Good labels:
   - `good first loader`
   - `a11y`
   - `docs`
   - `gallery`
   - `package`

4. Keep agent instructions strict.
   `AGENTS.md` is good. It should remain more specific than the README.

### Acceptance Criteria

- Maintainers can turn vague loader ideas into concrete issues.
- New contributors know the quality bar before writing code.
- Agent-authored PRs stay structured and reviewable.

## Workstream 9: Adoption Proof

This project should not claim production usefulness until it has been consumed outside its own gallery.

### Tasks

1. Create example apps.
   Add small examples under `examples/` or document external examples.

2. Test package installation from a tarball.
   Use `pnpm pack:core`, install the tarball into a clean app, and render multiple loaders.

3. Test SSR.
   Use a minimal Next.js route and confirm render does not fail.

4. Test style coexistence.
   Render loaders inside an app with Tailwind or another design system and confirm styles do not fight the host app.

5. Dogfood loader selection.
   Use registry metadata to power more of the gallery and docs so drift becomes obvious.

### Acceptance Criteria

- The package works in at least one clean Vite app and one clean Next.js app.
- Consumers do not need undocumented setup.
- Known limitations are documented honestly.

## Priority Roadmap

### Phase 0: Stabilize the Current v0

Goal: make the existing package honest and safe.

Tasks:

- Fix or redesign `ProgressPulse` progress copy.
- Decide automatic styles versus CSS import.
- Add stronger loader behavior tests.
- Add `CHANGELOG.md`.
- Add `pnpm pack:core` to CI.
- Verify npm tarball contents.

Exit criteria:

- `pnpm check` passes.
- `pnpm pack:core` passes.
- README and package README match the actual package behavior.

### Phase 1: Make It Easy to Use

Goal: make adoption obvious for normal React developers.

Tasks:

- Add Vite and Next.js examples.
- Add docs for styling, theming, and registry usage.
- Add routeable gallery pages per loader.
- Add decision guide copy.
- Add issue templates.

Exit criteria:

- A new user can install and use a loader in under five minutes.
- A maintainer can point users to one URL per loader.

### Phase 2: Fill Real Catalog Gaps

Goal: cover the loading states teams actually need.

Tasks:

- Add one page loader.
- Add one button loader.
- Add one table/data loader.
- Add one empty/search loader.
- Add one AI tool-call loader.

Exit criteria:

- Every important category has at least one stable loader.
- The gallery category rail no longer has empty-feeling product gaps.

### Phase 3: Launch-Quality Release

Goal: publish with confidence.

Tasks:

- Run clean install and full checks.
- Run package dry-run.
- Test tarball install in clean apps.
- Create release notes.
- Publish `@arthav/open-loading`.
- Tag the release.

Exit criteria:

- The npm package is installable and documented.
- GitHub release notes explain what changed.
- The gallery accurately represents the released package.

## Immediate Issue Backlog

These are the first issues I would open. They are intentionally scoped.

1. Fix `ProgressPulse` so it does not fake exact progress.
2. Decide and document the package style strategy.
3. Add style dedupe or CSS import support.
4. Add `CHANGELOG.md`.
5. Add `pnpm pack:core` to CI.
6. Add routeable gallery pages for individual loaders.
7. Add Vite consumer example.
8. Add Next.js consumer example.
9. Add registry-to-component consistency tests.
10. Add issue templates for loader requests and accessibility bugs.
11. Add a page-level loader.
12. Add a button-level loader.
13. Add a data-table skeleton loader.
14. Add a visual QA checklist for gallery changes.
15. Add docs for when not to use each loader category.

## Risks

### Style Injection Gets Annoying

If every loader injects styles independently, apps with many loaders may get duplicated style tags. This is fixable, but it needs a deliberate strategy before v1.

### The Gallery Becomes the Product

The gallery looks good, but the npm package is the product. Do not over-invest in gallery spectacle before package confidence, examples, and docs are solid.

### Metadata Drifts From Reality

The registry is powerful only if it stays true. Tests should compare metadata claims against component behavior.

### Loader Catalog Becomes Decorative

More loaders are not automatically better. Each new loader needs a use case that a real app would recognize.

### Fake Progress Damages Trust

Anything that looks determinate must be backed by a real prop or real state. Otherwise, use honest non-determinate language.

## Definition of Done for Real Use

The project is ready for real use when this story works end to end:

1. A user lands on the README or gallery.
2. They understand which loader fits their situation.
3. They install `@arthav/open-loading`.
4. They paste a documented example into Vite or Next.js.
5. It renders with accessible text and reduced-motion support.
6. Styling does not break their app.
7. TypeScript gives useful prop help.
8. The package build, tests, metadata validation, and pack dry-run all pass.
9. Contributors can add the next loader without asking where files belong.

That is the bar. Anything below that is still a demo.

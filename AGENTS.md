# AGENTS.md

This repo is intentionally friendly to AI coding agents. Follow these rules exactly.

## Do

- Add one loader per PR unless the user explicitly asks for a themed batch.
- Start from `templates/loader`.
- Keep loader components inside `packages/core/src/loaders`.
- Add or update metadata in `packages/core/src/registry/definitions.ts`.
- Export new components from `packages/core/src/loaders/index.ts`.
- Keep components accessible with `role="status"`, readable text, and reduced-motion support.
- Keep gallery changes driven by registry data where possible.
- Run `pnpm validate`, `pnpm typecheck`, `pnpm test:run`, and `pnpm build`.

## Do Not

- Do not add backend services for loader metadata.
- Do not hard-code a loader only in the gallery.
- Do not add decorative animation that ignores `reducedMotion`.
- Do not create a new package or framework target unless requested.
- Do not edit generated build output.
- Do not make the gallery cramped; preserve the cinematic stage-first layout.

## Do Not Touch

- Do not edit `dist`, coverage output, logs, or temporary QA screenshots.
- Do not change the root package from `private: true`.
- Do not publish to npm or push to a remote unless the user explicitly asks.
- Do not move loader metadata out of `packages/core/src/registry/definitions.ts`.
- Do not bypass `pnpm check` after changing loaders, registry data, or gallery behavior.

## Loader Metadata Requirements

Each loader definition must include:

- `id`
- `name`
- `componentName`
- `type`
- `useCases`
- `category`
- `complexity`
- `supportsMessage`
- `supportsError`
- `motionLevel`
- `props`
- `a11y`
- `agentNotes`

Use kebab-case for `id`, PascalCase for `componentName`, and concrete use cases instead of vague labels.

## Verification

Run the complete local gate before handing off:

```bash
pnpm check
```

For package publication changes, also run:

```bash
pnpm pack:core
```

## Visual Rules

- The gallery uses graphite/black surfaces with amber as the main accent.
- Keep panels crisp with 8px or lower radius.
- The selected loader stage should stay spacious and cinematic.
- Avoid generic SaaS bento grids, gradient blobs, and crowded dashboard density.

# Contributing

Thanks for improving `open-loading`. Human contributors and AI agents follow the same quality bar.

## Add a Loader

1. Copy `templates/loader` into `packages/core/src/loaders`.
2. Rename the files and component using PascalCase.
3. Add the loader metadata in `packages/core/src/registry/definitions.ts`.
4. Export the component from `packages/core/src/loaders/index.ts`.
5. Add or update tests for rendering, messages, errors, and reduced motion.
6. Run the full check suite.

```bash
pnpm check
```

## Accessibility Bar

- Loading text must be visible unless the loader is explicitly decorative inside another labelled control.
- Use `role="status"` for normal loading states.
- Use assertive announcements only for error states.
- Respect `reducedMotion` and `prefers-reduced-motion`.
- Do not rely on color alone to communicate error, success, or progress.

## Metadata Bar

Metadata is a public interface. Keep it stable, specific, and useful for code generation. An agent should be able to read the registry and know where the loader fits, what props are safe, and when not to use it.

## Pull Requests

Keep PRs focused. A good PR title looks like:

```text
Add MatrixCascade loader
```

Include screenshots or a short recording for new visual behavior when practical.

Use `docs/loader-decision-guide.md` when proposing a loader category, and run through `docs/visual-qa-checklist.md` for gallery or visual changes.

Before opening a PR, verify:

```bash
pnpm install --frozen-lockfile
pnpm check
```

For package-facing changes, also run:

```bash
pnpm pack:core
```

## Issue Templates

Use the GitHub issue forms to keep work scoped:

- Loader requests must describe the use case, expected wait duration, error support, progress needs, and real product examples.
- Accessibility issues should include the affected loader or route, assistive technology details when available, and reproduction steps.
- Bug reports should include the package version, environment, expected behavior, and actual behavior.
- Docs issues should point to the page or file that needs correction.

## Repository Boundaries

- The root package is private and manages the workspace.
- `packages/core` is the npm package.
- `apps/gallery` is the demo and documentation app.
- `docs/concepts` may contain approved design references.
- Do not commit `dist`, logs, coverage, local screenshots, or temporary QA files.

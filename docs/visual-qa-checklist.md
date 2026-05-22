# Visual QA Checklist

Run this checklist before merging gallery changes, new loaders, or major style updates. The goal is to catch layout crowding, motion mistakes, and misleading states before release.

## Required Routes

- `/gallery`
- `/gallery/button-hold`
- `/gallery/data-table-skeleton`
- `/gallery/empty-search`
- `/gallery/file-import-stack`
- `/gallery/thinking-orbit`
- `/gallery/tool-call-trace`
- `/gallery/route-reveal`
- `/gallery/error-retry`
- `/use-cases`
- `/docs`
- `/api`
- `/contribute`

## Desktop Checks

- The selected loader stage stays spacious and visually dominant.
- Category rail, stage, controls, and inspector do not overlap.
- Loader permalink is readable and does not crowd the title.
- Variant cards stay aligned and do not resize when selected.
- Code blocks scroll horizontally instead of breaking layout.
- Empty categories are clear without looking broken.

## Mobile Checks

- Top navigation scrolls horizontally without hiding route links.
- Search, install, and repository controls stack cleanly.
- Category buttons remain tappable and do not truncate critical labels.
- Stage content remains centered and does not overflow the viewport.
- Preview controls stack without text escaping inputs or buttons.
- Inspector tabs remain readable.

## Motion Checks

- Toggle reduced motion in the gallery and confirm the active loader stops custom animation.
- Confirm CSS `prefers-reduced-motion` still disables animation for loaders.
- Confirm new animations do not imply fake determinate progress.
- Confirm no loader relies on motion alone to communicate error, queue, or progress state.

## Error Checks

- Enable error mode on an error-capable loader and confirm `aria-live="assertive"`.
- Confirm loaders with `supportsError: false` do not switch into danger tone when `error` is passed.
- Confirm error copy is visible text, not only an icon or color.
- Confirm `ErrorRetry` is assertive only when an error prop is present.

## Package Checks

- Run `pnpm check`.
- Run `pnpm pack:core` for package-facing changes.
- Run `pnpm smoke:core-tarball` before release candidates.
- Inspect the dry-run tarball and confirm it includes `dist/styles.css`.
- Confirm gallery source, screenshots, logs, coverage, and temporary QA files are not in the tarball.

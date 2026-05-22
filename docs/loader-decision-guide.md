# Loader Decision Guide

Use this guide when choosing a loader for a product state or reviewing a new loader proposal. Visual taste matters, but the loader first has to tell the truth about what the product is doing.

## Inline

Use inline loaders for button submits, toolbar actions, compact panels, and local fetches that should not take over the page.

Do not use them for long-running AI work, route changes, upload/import work, or states where the user needs recovery context.

Current loaders:

- `button-hold`
- `simple-spinner`

## Page

Use page loaders for route transitions, dashboard initialization, app shells, and section-level waits where the main surface is not ready yet.

Do not use them inside buttons, table rows, sidebars, or tiny cards. A page loader implies broad scope, so it should not appear for a narrow local action.

Current loaders:

- `route-reveal`

## Skeleton

Use skeleton loaders when the final content shape is known and seeing the layout is more useful than seeing a spinner.

Do not use skeletons when the eventual layout is unknown, when the wait is under a few hundred milliseconds, or when the placeholder shape would lie about the incoming content.

Current loaders:

- `data-table-skeleton`
- `skeleton-wave`

## AI Thinking

Use AI-thinking loaders for chat replies, planning, reasoning, drafting, token streaming, and assistant work where visible intent matters.

Do not use them for ordinary CRUD saves, fast button submits, queue states, or compliance-heavy screens where expressive motion could feel unserious.

Current loaders:

- `thinking-orbit`
- `typing-dots`
- `ai-stream`
- `tool-call-trace`

## Uploading

Use uploading loaders for imports, file parsing, context uploads, and multi-step jobs where progress-like movement communicates that work is advancing.

Do not show fake exact percentages. If a loader displays determinate progress, it needs a real progress prop or real external state.

Current loaders:

- `file-import-stack`
- `progress-pulse`

## Error

Use error loaders for recoverable failures where retry, fallback, or continued work is possible.

Do not use them for unrecoverable destructive failures without a clear next action. In those cases, the product needs an error view, not a loader.

Current loaders:

- `error-retry`

## Empty

Use empty-state loaders for searches, filters, onboarding, or first-run flows where loading may legitimately resolve to no content.

Do not use them when data is expected to appear, because that confuses loading with an actual empty result.

Current loaders:

- `empty-search`

## Waiting Room

Use waiting-room loaders when the product is preserving a user slot, turn, queue position, rate-limit window, or capacity reservation.

Do not use them for fast inline actions. A queue loader tells users they are waiting for capacity, which is a strong product promise.

Current loaders:

- `queue-beacon`

## Experimental

Use experimental loaders for expressive long-running work, creative generation, and exploratory AI flows where atmosphere is acceptable.

Do not use them in transactional, dense, regulated, or performance-sensitive screens unless the product team has explicitly accepted the extra motion and visual weight.

Current loaders:

- `neural-galaxy`

# @arthav/open-loading

Composable React loading states with machine-readable metadata for humans and AI coding agents.

## Install

```bash
npm install @arthav/open-loading
```

The package expects React and React DOM `18.2.0` or newer in the consuming app.

## Usage

```tsx
import { ThinkingOrbit } from "@arthav/open-loading";

export function PendingState() {
  return (
    <ThinkingOrbit
      message="Analyzing your request..."
      size="lg"
      tone="brand"
    />
  );
}
```

## Exports

```tsx
import {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  OpenLoadingStyles,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots,
  getLoaderById,
  getLoadersByCategory,
  loaders
} from "@arthav/open-loading";
```

Every loader uses the shared `LoaderProps` contract:

```ts
type LoaderProps = {
  message?: string;
  error?: string | boolean;
  size?: "sm" | "md" | "lg";
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
  reducedMotion?: boolean;
  className?: string;
};
```

## Styling

For production apps, import the package stylesheet once near your app root:

```tsx
import "@arthav/open-loading/styles.css";
```

Loaders also include a client-side singleton style fallback for zero-config usage. The explicit stylesheet import is better for SSR and avoids relying on runtime style injection. All component styles use namespaced `ol-` classes and CSS variables.

## Framework Notes

Vite apps can import the stylesheet in `src/main.tsx`. Next.js App Router apps can import it in `app/layout.tsx`, then render loader components from a client component. See the root `examples/vite-react` and `examples/next-app-router` folders for complete minimal apps.

## Registry

`loaders` exposes metadata for gallery rendering, documentation, validation, and AI-agent contribution workflows. Use `getLoaderById(id)` when you need a specific loader definition.

## Accessibility

Bundled loaders expose visible loading text, use live regions, and respect `reducedMotion` plus `prefers-reduced-motion`.

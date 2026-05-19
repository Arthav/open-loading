# @open-loading/react

Composable React loading states with machine-readable metadata for humans and AI coding agents.

## Install

```bash
pnpm add @open-loading/react
```

## Usage

```tsx
import { ThinkingOrbit } from "@open-loading/react";

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
  ErrorRetry,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  TypingDots,
  getLoaderById,
  loaders
} from "@open-loading/react";
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

## Registry

`loaders` exposes metadata for gallery rendering, documentation, validation, and AI-agent contribution workflows. Use `getLoaderById(id)` when you need a specific loader definition.

## Accessibility

Bundled loaders expose visible loading text, use live regions, and respect `reducedMotion` plus `prefers-reduced-motion`.

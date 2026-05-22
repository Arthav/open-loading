"use client";

import {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  RouteReveal,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace
} from "@arthav/open-loading";

export function LoadingDemo() {
  return (
    <main className="page">
      <section className="intro">
        <div>
          <p className="eyebrow">Next.js App Router</p>
          <h1>Client loading states with a server-rendered shell.</h1>
        </div>
        <ThinkingOrbit message="Hydrating workspace..." size="lg" tone="brand" />
      </section>

      <section className="grid" aria-label="Next.js loading examples">
        <article>
          <h2>Tool call</h2>
          <ToolCallTrace message="Calling billing tools..." />
        </article>
        <article>
          <h2>Empty search</h2>
          <EmptySearch message="Checking saved filters..." />
        </article>
        <article>
          <h2>Data table</h2>
          <DataTableSkeleton message="Loading invoices..." />
        </article>
        <article>
          <h2>Button submit</h2>
          <ButtonHold message="Saving" size="sm" />
        </article>
        <article>
          <h2>Page transition</h2>
          <RouteReveal message="Preparing project route..." />
        </article>
        <article>
          <h2>File import</h2>
          <FileImportStack message="Validating CSV rows..." tone="warning" />
        </article>
        <article>
          <h2>Route shell</h2>
          <SkeletonWave message="Preparing dashboard layout..." />
        </article>
        <article>
          <h2>AI reply</h2>
          <AIStream message="Streaming model output..." tone="success" />
        </article>
        <article>
          <h2>Retry surface</h2>
          <ErrorRetry error="The request failed. Retry is safe." />
        </article>
      </section>
    </main>
  );
}

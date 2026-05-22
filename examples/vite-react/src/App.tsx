import {
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  QueueBeacon,
  RouteReveal,
  ThinkingOrbit,
  ToolCallTrace
} from "@arthav/open-loading";

export function App() {
  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Vite consumer app</p>
          <h1>Production loading states without custom loader plumbing.</h1>
        </div>
        <ThinkingOrbit
          className="heroLoader"
          message="Planning the next response..."
          size="lg"
          tone="brand"
        />
      </section>

      <section className="examples" aria-label="Common loading states">
        <article>
          <h2>Tool call</h2>
          <ToolCallTrace message="Calling CRM tools..." />
        </article>
        <article>
          <h2>Empty search</h2>
          <EmptySearch message="Checking filters..." />
        </article>
        <article>
          <h2>Data table</h2>
          <DataTableSkeleton message="Loading customers..." />
        </article>
        <article>
          <h2>Button submit</h2>
          <ButtonHold message="Saving" size="sm" />
        </article>
        <article>
          <h2>Page transition</h2>
          <RouteReveal message="Preparing workspace..." tone="brand" />
        </article>
        <article>
          <h2>File import</h2>
          <FileImportStack message="Validating CSV rows..." tone="warning" />
        </article>
        <article>
          <h2>Capacity queue</h2>
          <QueueBeacon message="Holding your workspace slot..." tone="brand" />
        </article>
        <article>
          <h2>Recoverable error</h2>
          <ErrorRetry error="Upload paused. Retry is available." />
        </article>
      </section>
    </main>
  );
}

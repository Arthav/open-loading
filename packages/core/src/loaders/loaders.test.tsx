import { render, screen } from "@testing-library/react";
import type { LoaderComponent, LoaderDefinition } from "../types.js";
import { loaders as loaderDefinitions } from "../registry/index.js";
import {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots
} from "./index.js";

const componentMap: Record<string, LoaderComponent> = {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots
};

const loaderCases = loaderDefinitions.map((definition) => [
  definition,
  componentMap[definition.componentName]
]) as Array<[LoaderDefinition, LoaderComponent]>;

function getAccessibleName(definition: LoaderDefinition) {
  const name = `${definition.name.replace(" / ", " ")} loading state`;

  return new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
}

describe("loader components", () => {
  beforeEach(() => {
    document
      .querySelectorAll("style[data-open-loading-styles]")
      .forEach((style) => style.remove());
  });

  it("exports every component named by the registry", () => {
    for (const definition of loaderDefinitions) {
      expect(componentMap[definition.componentName]).toEqual(expect.any(Function));
    }
  });

  it.each(loaderCases)(
    "renders %s with its default message and live-region metadata",
    (definition, Loader) => {
      render(<Loader reducedMotion />);

      const status = screen.getByRole("status", {
        name: getAccessibleName(definition)
      });

      expect(status).toHaveTextContent(definition.previewMessage);
      expect(status).toHaveAttribute("aria-live", definition.a11y.ariaLive);
    }
  );

  it.each(loaderCases)("renders custom message copy for %s", (definition, Loader) => {
    render(<Loader message="Working on it" reducedMotion />);

    const status = screen.getByRole("status", {
      name: getAccessibleName(definition)
    });

    expect(status).toHaveTextContent("Working on it");
  });

  it.each(loaderCases)("sets reduced motion data attribute for %s", (definition, Loader) => {
    render(<Loader reducedMotion />);

    expect(
      screen.getByRole("status", { name: getAccessibleName(definition) })
    ).toHaveAttribute("data-reduced-motion", "true");
  });

  it.each(loaderCases)(
    "matches supportsError metadata for %s",
    (definition, Loader) => {
      render(
        <Loader
          error="Something needs attention"
          message="Still working"
          reducedMotion
        />
      );

      const status = screen.getByRole("status", {
        name: getAccessibleName(definition)
      });

      if (definition.supportsError) {
        expect(status).toHaveAttribute("aria-live", "assertive");
        expect(status).toHaveAttribute("data-tone", "danger");
        expect(status).toHaveTextContent("Something needs attention");
      } else {
        expect(status).toHaveAttribute("aria-live", "polite");
        expect(status).not.toHaveAttribute("data-tone", "danger");
        expect(status).toHaveTextContent("Still working");
        expect(status).not.toHaveTextContent("Something needs attention");
      }
    }
  );

  it("injects open-loading styles once for multiple loaders", () => {
    render(
      <>
        <SimpleSpinner />
        <TypingDots />
      </>
    );

    expect(
      document.querySelectorAll("style[data-open-loading-styles]")
    ).toHaveLength(1);
  });

  it("keeps ProgressPulse copy non-determinate", () => {
    render(<ProgressPulse />);

    expect(screen.getByRole("status")).toHaveTextContent("Progress is moving");
    expect(screen.getByRole("status")).not.toHaveTextContent("% complete");
  });

  it("keeps ButtonHold compact for button-level pending states", () => {
    render(<ButtonHold message="Saving record" reducedMotion />);

    const status = screen.getByRole("status", {
      name: "Button hold loading state"
    });

    expect(status).toHaveAttribute("data-layout", "inline");
    expect(status).toHaveAttribute("data-reduced-motion", "true");
    expect(status).toHaveTextContent("Saving record");
  });

  it("renders DataTableSkeleton as a table-shaped placeholder", () => {
    const { container } = render(<DataTableSkeleton reducedMotion />);

    const status = screen.getByRole("status", {
      name: "Data table skeleton loading state"
    });

    expect(status).toHaveTextContent("Loading rows...");
    expect(container.querySelectorAll(".ol-table-cell")).toHaveLength(20);
  });

  it("renders EmptySearch as a search-to-empty placeholder", () => {
    const { container } = render(<EmptySearch reducedMotion />);

    const status = screen.getByRole("status", {
      name: "Empty search loading state"
    });

    expect(status).toHaveTextContent("Checking for matches...");
    expect(container.querySelectorAll(".ol-empty-row")).toHaveLength(3);
  });

  it("renders ToolCallTrace as an agent tool-call sequence", () => {
    const { container } = render(<ToolCallTrace reducedMotion />);

    const status = screen.getByRole("status", {
      name: "Tool call trace loading state"
    });

    expect(status).toHaveTextContent("Calling tools...");
    expect(container.querySelectorAll(".ol-tool-step")).toHaveLength(3);
  });

  it("renders FileImportStack as an import pipeline", () => {
    const { container } = render(<FileImportStack reducedMotion />);

    const status = screen.getByRole("status", {
      name: "File import stack loading state"
    });

    expect(status).toHaveTextContent("Importing file...");
    expect(container.querySelectorAll(".ol-import-step")).toHaveLength(3);
  });
});

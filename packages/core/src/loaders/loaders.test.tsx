import { render, screen } from "@testing-library/react";
import {
  AIStream,
  ErrorRetry,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  TypingDots
} from "./index.js";

const loaders = [
  ["ThinkingOrbit", ThinkingOrbit],
  ["SimpleSpinner", SimpleSpinner],
  ["TypingDots", TypingDots],
  ["ProgressPulse", ProgressPulse],
  ["SkeletonWave", SkeletonWave],
  ["AIStream", AIStream],
  ["ErrorRetry", ErrorRetry],
  ["NeuralGalaxy", NeuralGalaxy],
  ["QueueBeacon", QueueBeacon]
] as const;

describe("loader components", () => {
  it.each(loaders)("renders %s with role=status", (_name, Loader) => {
    render(<Loader message="Working on it" reducedMotion />);

    expect(screen.getByRole("status")).toHaveTextContent("Working on it");
  });

  it("announces errors assertively", () => {
    render(<ThinkingOrbit error="Something needs attention" />);

    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "assertive");
    expect(status).toHaveTextContent("Something needs attention");
  });

  it("sets reduced motion data attribute", () => {
    render(<SimpleSpinner reducedMotion />);

    expect(screen.getByRole("status")).toHaveAttribute(
      "data-reduced-motion",
      "true"
    );
  });
});

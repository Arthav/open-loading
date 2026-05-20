import type { LoaderDefinition } from "../../packages/core/src/types";

// Add this object to packages/core/src/registry/definitions.ts and keep the id
// kebab-case so validation and agent tooling can find it reliably.
export const loaderNameDefinition = {
  id: "loader-name",
  name: "Loader Name",
  componentName: "LoaderName",
  type: "inline",
  useCases: ["short task", "inline pending"],
  category: "inline",
  complexity: "low",
  supportsMessage: true,
  supportsError: false,
  motionLevel: "subtle",
  packageName: "@arthav/open-loading",
  version: "0.1.0",
  framework: "React + TypeScript",
  license: "MIT",
  tags: ["template"],
  previewMessage: "Loading...",
  props: [],
  a11y: {
    ariaLive: "polite",
    reducedMotion: "respected",
    contrast: "high",
    notes: ["Explain how this loader announces state and handles motion."]
  },
  agentNotes: {
    schemaVersion: "1.0",
    status: "stable",
    addWhen: "Explain when this loader is appropriate.",
    avoidWhen: "Explain when not to use this loader.",
    safeToModify: ["message copy", "animation timing"]
  }
} satisfies LoaderDefinition;

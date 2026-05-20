import type { LoaderDefinition, LoaderPropDefinition } from "../types.js";

const commonProps: LoaderPropDefinition[] = [
  {
    name: "message",
    type: "string",
    required: false,
    description: "Visible loading message announced by assistive technology."
  },
  {
    name: "error",
    type: "string | boolean",
    required: false,
    description: "Switches the loader into an error-aware state."
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    required: false,
    defaultValue: "md",
    description: "Controls the visual scale without changing the layout contract."
  },
  {
    name: "tone",
    type: '"neutral" | "brand" | "success" | "warning" | "danger"',
    required: false,
    defaultValue: "brand",
    description: "Applies semantic color treatment to the loader."
  },
  {
    name: "reducedMotion",
    type: "boolean",
    required: false,
    defaultValue: "false",
    description: "Disables custom animation when a parent app needs static rendering."
  },
  {
    name: "className",
    type: "string",
    required: false,
    description: "Adds a class to the loader root for local layout hooks."
  }
];

const base = {
  packageName: "@arthav/open-loading" as const,
  version: "0.1.0",
  framework: "React + TypeScript" as const,
  license: "MIT" as const,
  props: commonProps,
  a11y: {
    ariaLive: "polite" as const,
    reducedMotion: "respected" as const,
    contrast: "high" as const,
    notes: [
      "Root uses role=status.",
      "Messages are exposed through aria-live.",
      "Animations stop when reducedMotion is true or prefers-reduced-motion is active."
    ]
  }
};

export const loaderDefinitions = [
  {
    ...base,
    id: "thinking-orbit",
    name: "Thinking Orbit",
    componentName: "ThinkingOrbit",
    type: "ai-thinking",
    useCases: ["AI reasoning", "planning", "streaming"],
    category: "ai-thinking",
    complexity: "high",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "complex",
    tags: ["ai", "orbit", "cinematic", "message"],
    previewMessage: "Analyzing your request...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when an AI product needs a calm but premium thinking state.",
      avoidWhen: "Avoid inside very small inline controls.",
      safeToModify: ["message copy", "particle count", "orbit timing", "accent tone"]
    }
  },
  {
    ...base,
    id: "simple-spinner",
    name: "Simple Spinner",
    componentName: "SimpleSpinner",
    type: "inline",
    useCases: ["button pending", "inline fetch", "small panels"],
    category: "inline",
    complexity: "low",
    supportsMessage: true,
    supportsError: false,
    motionLevel: "moderate",
    tags: ["spinner", "inline", "minimal"],
    previewMessage: "Loading...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when the interface needs the most familiar pending state.",
      avoidWhen: "Avoid when progress, error recovery, or AI reasoning context matters.",
      safeToModify: ["stroke width", "size", "tone"]
    }
  },
  {
    ...base,
    id: "typing-dots",
    name: "Typing Dots",
    componentName: "TypingDots",
    type: "ai-thinking",
    useCases: ["chat reply", "assistant drafting", "typing simulation"],
    category: "ai-thinking",
    complexity: "low",
    supportsMessage: true,
    supportsError: false,
    motionLevel: "subtle",
    tags: ["chat", "dots", "assistant"],
    previewMessage: "Composing response...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use in conversational interfaces where users expect a reply soon.",
      avoidWhen: "Avoid for long-running jobs without additional progress context.",
      safeToModify: ["dot count", "animation delay", "message copy"]
    }
  },
  {
    ...base,
    id: "progress-pulse",
    name: "Progress Pulse",
    componentName: "ProgressPulse",
    type: "uploading",
    useCases: ["uploading", "importing", "multi-step job"],
    category: "uploading",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "moderate",
    tags: ["progress", "upload", "job"],
    previewMessage: "Uploading context...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when work has a progress-like feeling even if exact percent is simulated.",
      avoidWhen: "Avoid when exact determinate progress is legally or operationally required.",
      safeToModify: ["bar width", "duration", "submessage"]
    }
  },
  {
    ...base,
    id: "skeleton-wave",
    name: "Skeleton Wave",
    componentName: "SkeletonWave",
    type: "skeleton",
    useCases: ["content loading", "cards", "tables"],
    category: "skeleton",
    complexity: "medium",
    supportsMessage: true,
    supportsError: false,
    motionLevel: "subtle",
    tags: ["skeleton", "content", "placeholder"],
    previewMessage: "Preparing layout...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when the final layout shape is more useful than a centered spinner.",
      avoidWhen: "Avoid if the eventual content shape is unknown.",
      safeToModify: ["row count", "row width", "sheen speed"]
    }
  },
  {
    ...base,
    id: "ai-stream",
    name: "AI Stream",
    componentName: "AIStream",
    type: "ai-thinking",
    useCases: ["token streaming", "voice processing", "reasoning pulse"],
    category: "ai-thinking",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "moderate",
    tags: ["stream", "tokens", "audio"],
    previewMessage: "Streaming reasoning...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when generation feels continuous rather than a single wait.",
      avoidWhen: "Avoid if motion could be mistaken for real audio input.",
      safeToModify: ["bar count", "bar height", "wave timing"]
    }
  },
  {
    ...base,
    id: "error-retry",
    name: "Error / Retry",
    componentName: "ErrorRetry",
    type: "error",
    useCases: ["retrying", "failed request", "recoverable error"],
    category: "error",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "none",
    tags: ["error", "retry", "fallback"],
    previewMessage: "Request needs attention",
    a11y: {
      ...base.a11y,
      ariaLive: "assertive" as const,
      notes: [
        "Root switches to assertive announcements for error copy.",
        "Visual warning shape is not the only signal; message text remains required."
      ]
    },
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when a task failed but the product can recover or retry.",
      avoidWhen: "Avoid for unrecoverable destructive failures without a clear action.",
      safeToModify: ["message copy", "danger tone", "fallback submessage"]
    }
  },
  {
    ...base,
    id: "neural-galaxy",
    name: "Neural Galaxy",
    componentName: "NeuralGalaxy",
    type: "experimental",
    useCases: ["long-running AI", "creative generation", "exploration"],
    category: "experimental",
    complexity: "high",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "complex",
    tags: ["experimental", "galaxy", "creative"],
    previewMessage: "Mapping possibilities...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "experimental",
      addWhen: "Use for expressive AI workflows where atmosphere is acceptable.",
      avoidWhen: "Avoid in transactional or compliance-heavy screens.",
      safeToModify: ["ring count", "particle color", "duration", "message copy"]
    }
  },
  {
    ...base,
    id: "queue-beacon",
    name: "Queue Beacon",
    componentName: "QueueBeacon",
    type: "waiting-room",
    useCases: ["rate-limit wait", "capacity queue", "turn-based access"],
    category: "waiting-room",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "moderate",
    tags: ["queue", "waiting-room", "capacity", "beacon"],
    previewMessage: "Holding your place...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen: "Use when the product is reserving a user slot or waiting for capacity.",
      avoidWhen: "Avoid for fast inline actions where a queue would imply unnecessary delay.",
      safeToModify: ["pulse timing", "queue pip count", "message copy", "accent tone"]
    }
  }
] satisfies LoaderDefinition[];

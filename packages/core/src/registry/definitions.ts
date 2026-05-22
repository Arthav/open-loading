import type { LoaderDefinition, LoaderPropDefinition } from "../types.js";
import { packageVersion } from "./package-version.js";

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
  version: packageVersion,
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
    id: "button-hold",
    name: "Button Hold",
    componentName: "ButtonHold",
    type: "inline",
    useCases: ["button pending", "form submit", "toolbar action"],
    category: "inline",
    complexity: "low",
    supportsMessage: true,
    supportsError: false,
    motionLevel: "subtle",
    tags: ["button", "submit", "inline", "compact"],
    previewMessage: "Saving...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen:
        "Use inside submit buttons, toolbar actions, and compact controls where dimensions should stay stable while work is pending.",
      avoidWhen:
        "Avoid for page loads, multi-step imports, AI reasoning, or recoverable errors that need more context than a button can hold.",
      safeToModify: ["message copy", "glyph size", "animation timing", "accent tone"]
    }
  },
  {
    ...base,
    id: "route-reveal",
    name: "Route Reveal",
    componentName: "RouteReveal",
    type: "page",
    useCases: ["route transition", "dashboard initialization", "page shell loading"],
    category: "page",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "subtle",
    tags: ["page", "route", "dashboard", "shell"],
    previewMessage: "Preparing page...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen:
        "Use when a route, dashboard, or app section needs a spacious loading state before the full page is ready.",
      avoidWhen:
        "Avoid inside buttons, table rows, or tiny inline surfaces where a page shell would imply too much scope.",
      safeToModify: ["shell density", "sweep timing", "message copy", "accent tone"]
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
    id: "file-import-stack",
    name: "File Import Stack",
    componentName: "FileImportStack",
    type: "uploading",
    useCases: ["file import", "row parsing", "data validation"],
    category: "uploading",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "moderate",
    tags: ["file", "import", "parse", "validate", "upload"],
    previewMessage: "Importing file...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen:
        "Use when a product is parsing, validating, and importing user-provided files or tabular data.",
      avoidWhen:
        "Avoid for plain uploads that do not include import semantics, exact determinate progress, or inline button submits.",
      safeToModify: ["step count", "file shape", "message copy", "validation timing"]
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
    id: "data-table-skeleton",
    name: "Data Table Skeleton",
    componentName: "DataTableSkeleton",
    type: "skeleton",
    useCases: ["data table loading", "admin list", "query results"],
    category: "skeleton",
    complexity: "medium",
    supportsMessage: true,
    supportsError: false,
    motionLevel: "subtle",
    tags: ["table", "rows", "columns", "skeleton", "dashboard"],
    previewMessage: "Loading rows...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen:
        "Use when a data grid, admin list, or query result table is loading and the column structure is already known.",
      avoidWhen:
        "Avoid for card feeds, unknown layouts, or empty search results where a table skeleton would misrepresent the incoming content.",
      safeToModify: ["column count", "row count", "cell density", "sheen speed"]
    }
  },
  {
    ...base,
    id: "empty-search",
    name: "Empty Search",
    componentName: "EmptySearch",
    type: "empty",
    useCases: ["search loading", "filter results", "first-run empty state"],
    category: "empty",
    complexity: "low",
    supportsMessage: true,
    supportsError: false,
    motionLevel: "subtle",
    tags: ["empty", "search", "filters", "results"],
    previewMessage: "Checking for matches...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen:
        "Use while search, filters, or first-run data checks may resolve to an empty result.",
      avoidWhen:
        "Avoid when content is definitely loading into a known layout, when a table skeleton is more honest, or when the request has failed.",
      safeToModify: ["message copy", "row count", "scan timing", "accent tone"]
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
    id: "tool-call-trace",
    name: "Tool Call Trace",
    componentName: "ToolCallTrace",
    type: "ai-thinking",
    useCases: ["tool call", "agent action", "function execution"],
    category: "ai-thinking",
    complexity: "medium",
    supportsMessage: true,
    supportsError: true,
    motionLevel: "moderate",
    tags: ["agent", "tools", "function-call", "workflow"],
    previewMessage: "Calling tools...",
    agentNotes: {
      schemaVersion: "1.0",
      status: "stable",
      addWhen:
        "Use when an AI agent is actively calling tools, executing functions, or coordinating external actions.",
      avoidWhen:
        "Avoid for plain text generation, idle chat typing, or background jobs where no tool action is actually happening.",
      safeToModify: ["step count", "line timing", "message copy", "accent tone"]
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
      notes: [
        "Root uses polite announcements until an error prop is present.",
        "Root switches to assertive announcements for error copy when recovering.",
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

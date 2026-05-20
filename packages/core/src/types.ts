import type { ReactNode } from "react";

export type LoaderSize = "sm" | "md" | "lg";
export type LoaderTone = "neutral" | "brand" | "success" | "warning" | "danger";
export type LoaderType =
  | "inline"
  | "page"
  | "skeleton"
  | "ai-thinking"
  | "uploading"
  | "error"
  | "empty"
  | "waiting-room"
  | "experimental";
export type LoaderComplexity = "low" | "medium" | "high";
export type LoaderMotionLevel = "none" | "subtle" | "moderate" | "complex";

export interface LoaderProps {
  message?: string;
  error?: string | boolean;
  size?: LoaderSize;
  tone?: LoaderTone;
  reducedMotion?: boolean;
  className?: string;
}

export interface LoaderPropDefinition {
  name: keyof LoaderProps | string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface LoaderA11yDefinition {
  ariaLive: "off" | "polite" | "assertive";
  reducedMotion: "respected" | "static-only" | "not-applicable";
  contrast: "high" | "medium";
  notes: string[];
}

export interface LoaderAgentNotes {
  schemaVersion: "1.0";
  status: "stable" | "experimental";
  addWhen: string;
  avoidWhen: string;
  safeToModify: string[];
}

export interface LoaderDefinition {
  id: string;
  name: string;
  componentName: string;
  type: LoaderType;
  useCases: string[];
  category: LoaderType;
  complexity: LoaderComplexity;
  supportsMessage: boolean;
  supportsError: boolean;
  motionLevel: LoaderMotionLevel;
  packageName: "@arthav/open-loading";
  version: string;
  framework: "React + TypeScript";
  license: "MIT";
  tags: string[];
  previewMessage: string;
  props: LoaderPropDefinition[];
  a11y: LoaderA11yDefinition;
  agentNotes: LoaderAgentNotes;
}

export type LoaderComponent = (props: LoaderProps) => ReactNode;

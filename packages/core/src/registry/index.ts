import type { LoaderDefinition } from "../types";
import { loaderDefinitions } from "./definitions";

export const loaders: LoaderDefinition[] = [...loaderDefinitions];

export function getLoaderById(id: string): LoaderDefinition | undefined {
  return loaders.find((loader) => loader.id === id);
}

export function getLoadersByCategory(
  category: LoaderDefinition["category"]
): LoaderDefinition[] {
  return loaders.filter((loader) => loader.category === category);
}

export function assertValidLoaderDefinitions(
  definitions: LoaderDefinition[] = loaders
): void {
  const ids = new Set<string>();
  const componentNames = new Set<string>();

  for (const definition of definitions) {
    if (!definition.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(definition.id)) {
      throw new Error(`Invalid loader id: ${definition.id}`);
    }

    if (ids.has(definition.id)) {
      throw new Error(`Duplicate loader id: ${definition.id}`);
    }

    if (componentNames.has(definition.componentName)) {
      throw new Error(`Duplicate component name: ${definition.componentName}`);
    }

    if (!definition.name || !definition.previewMessage) {
      throw new Error(`Loader ${definition.id} is missing display metadata.`);
    }

    if (definition.props.length === 0) {
      throw new Error(`Loader ${definition.id} must document its props.`);
    }

    if (definition.a11y.notes.length === 0) {
      throw new Error(`Loader ${definition.id} must include accessibility notes.`);
    }

    if (definition.agentNotes.schemaVersion !== "1.0") {
      throw new Error(`Loader ${definition.id} has unsupported schema version.`);
    }

    ids.add(definition.id);
    componentNames.add(definition.componentName);
  }
}

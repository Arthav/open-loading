import {
  assertValidLoaderDefinitions,
  getLoaderById,
  getLoadersByCategory,
  loaders
} from "./index.js";
import packageJson from "../../package.json" with { type: "json" };
import { packageVersion } from "./package-version.js";

describe("loader registry", () => {
  it("validates all bundled loader definitions", () => {
    expect(() => assertValidLoaderDefinitions(loaders)).not.toThrow();
  });

  it("finds loaders by id", () => {
    expect(getLoaderById("thinking-orbit")?.componentName).toBe("ThinkingOrbit");
  });

  it("groups loaders by category", () => {
    const aiLoaders = getLoadersByCategory("ai-thinking");

    expect(aiLoaders.map((loader) => loader.id)).toEqual(
      expect.arrayContaining([
        "thinking-orbit",
        "typing-dots",
        "ai-stream",
        "tool-call-trace"
      ])
    );
  });

  it("includes compact action loaders in inline category", () => {
    expect(getLoadersByCategory("inline").map((loader) => loader.id)).toEqual(
      expect.arrayContaining(["simple-spinner", "button-hold"])
    );
  });

  it("includes a page-level route loader", () => {
    expect(getLoadersByCategory("page").map((loader) => loader.id)).toEqual([
      "route-reveal"
    ]);
  });

  it("includes table-specific loaders in skeleton category", () => {
    expect(getLoadersByCategory("skeleton").map((loader) => loader.id)).toEqual(
      expect.arrayContaining(["skeleton-wave", "data-table-skeleton"])
    );
  });

  it("includes file import loaders in uploading category", () => {
    expect(getLoadersByCategory("uploading").map((loader) => loader.id)).toEqual(
      expect.arrayContaining(["progress-pulse", "file-import-stack"])
    );
  });

  it("includes a search-to-empty loader in empty category", () => {
    expect(getLoadersByCategory("empty").map((loader) => loader.id)).toEqual([
      "empty-search"
    ]);
  });

  it("includes a waiting-room loader", () => {
    expect(getLoadersByCategory("waiting-room").map((loader) => loader.id)).toEqual([
      "queue-beacon"
    ]);
  });

  it("keeps loader metadata versions aligned with package metadata", () => {
    expect(packageVersion).toBe(packageJson.version);
    expect(loaders.map((loader) => loader.version)).toEqual(
      loaders.map(() => packageJson.version)
    );
  });

  it("rejects duplicate ids", () => {
    expect(() =>
      assertValidLoaderDefinitions([loaders[0], { ...loaders[1], id: loaders[0].id }])
    ).toThrow(/Duplicate loader id/);
  });
});

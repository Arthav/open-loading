import {
  assertValidLoaderDefinitions,
  getLoaderById,
  getLoadersByCategory,
  loaders
} from "./index.js";

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
      expect.arrayContaining(["thinking-orbit", "typing-dots", "ai-stream"])
    );
  });

  it("includes a waiting-room loader", () => {
    expect(getLoadersByCategory("waiting-room").map((loader) => loader.id)).toEqual([
      "queue-beacon"
    ]);
  });

  it("rejects duplicate ids", () => {
    expect(() =>
      assertValidLoaderDefinitions([loaders[0], { ...loaders[1], id: loaders[0].id }])
    ).toThrow(/Duplicate loader id/);
  });
});

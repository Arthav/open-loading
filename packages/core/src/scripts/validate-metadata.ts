import { assertValidLoaderDefinitions, loaders } from "../registry/index.js";
import { packageVersion } from "../registry/package-version.js";
import packageJson from "../../package.json" with { type: "json" };

assertValidLoaderDefinitions(loaders);

if (packageVersion !== packageJson.version) {
  throw new Error(
    `Registry package version ${packageVersion} does not match package.json version ${packageJson.version}.`
  );
}

for (const loader of loaders) {
  if (loader.version !== packageJson.version) {
    throw new Error(
      `Loader ${loader.id} version ${loader.version} does not match package.json version ${packageJson.version}.`
    );
  }
}

console.log(`Validated ${loaders.length} open-loading loader definitions.`);

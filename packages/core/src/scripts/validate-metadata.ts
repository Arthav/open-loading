import { assertValidLoaderDefinitions, loaders } from "../registry/index.js";

assertValidLoaderDefinitions(loaders);

console.log(`Validated ${loaders.length} open-loading loader definitions.`);

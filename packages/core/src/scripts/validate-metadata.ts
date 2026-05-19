import { assertValidLoaderDefinitions, loaders } from "../registry";

assertValidLoaderDefinitions(loaders);

console.log(`Validated ${loaders.length} open-loading loader definitions.`);

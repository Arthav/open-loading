import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const stylesModuleUrl = pathToFileURL(
  resolve(scriptDir, "../dist/loaders/styles.js")
);
const { openLoadingCss } = await import(stylesModuleUrl.href);
const outputPath = resolve(scriptDir, "../dist/styles.css");

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${openLoadingCss.trim()}\n`, "utf8");

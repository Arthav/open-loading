import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = fileURLToPath(new URL(".", import.meta.url));
const packageDir = resolve(scriptDir, "..");
const workspaceRoot = resolve(packageDir, "..", "..");
const tempBase = existsSync("C:\\tmp") ? "C:\\tmp" : tmpdir();
const tempRoot = mkdtempSync(join(tempBase, "open-loading-smoke-"));
const consumerDir = join(tempRoot, "consumer");

const npmCommand = "npm";
const pnpmCommand = "pnpm";

function run(command, args, cwd) {
  console.log(`> ${command} ${args.join(" ")}`);
  execFileSync(command, args, {
    cwd,
    env: { ...process.env, CI: "false" },
    shell: process.platform === "win32",
    stdio: "inherit"
  });
}

function writeJson(path, value) {
  writeFileSync(`${path}.json`, `${JSON.stringify(value, null, 2)}\n`);
}

function writeText(path, value) {
  writeFileSync(path, value);
}

function assertSafeTempPath(path) {
  const resolvedTempRoot = resolve(tempBase);
  const resolvedPath = resolve(path);
  const prefix = `open-loading-smoke-`;

  if (!resolvedPath.startsWith(`${resolvedTempRoot}${sep}`)) {
    throw new Error(`Refusing to clean path outside temp root: ${resolvedPath}`);
  }

  if (!basename(resolvedPath).startsWith(prefix)) {
    throw new Error(`Refusing to clean non-smoke temp path: ${resolvedPath}`);
  }
}

try {
  run(npmCommand, ["pack", "--pack-destination", tempRoot], packageDir);

  const tarballName = readdirSync(tempRoot).find((entry) =>
    entry.endsWith(".tgz")
  );

  if (!tarballName) {
    throw new Error("npm pack did not produce a tarball.");
  }

  mkdirSync(join(consumerDir, "src"), { recursive: true });

  writeJson(join(consumerDir, "package"), {
    name: "open-loading-tarball-consumer-smoke",
    private: true,
    type: "module",
    scripts: {
      build: "vite build",
      ssr: "tsx src/ssr-smoke.tsx",
      typecheck: "tsc -p tsconfig.json --noEmit"
    },
    dependencies: {
      "@arthav/open-loading": `file:../${tarballName}`,
      react: "19.2.6",
      "react-dom": "19.2.6",
      tsx: "4.22.2",
      typescript: "5.9.3",
      vite: "5.4.21"
    }
  });

  writeJson(join(consumerDir, "tsconfig"), {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["DOM", "DOM.Iterable", "ES2020"],
      allowJs: false,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      module: "ESNext",
      moduleResolution: "Bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx"
    },
    include: ["src/typecheck.ts", "src/react-shim.d.ts"]
  });

  writeText(
    join(consumerDir, "index.html"),
    '<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>open-loading smoke</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n'
  );

  writeText(
    join(consumerDir, "src", "main.tsx"),
    `import { createRoot } from "react-dom/client";
import "@arthav/open-loading/styles.css";
import {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots,
  getLoaderById,
  getLoadersByCategory,
  loaders,
  type LoaderComponent
} from "@arthav/open-loading";

const components: Record<string, LoaderComponent> = {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots
};

const missingExports = loaders.filter(
  (definition) => !components[definition.componentName]
);

if (missingExports.length > 0) {
  throw new Error(
    \`Missing component exports: \${missingExports.map((loader) => loader.componentName).join(", ")}\`
  );
}

if (!getLoaderById("file-import-stack")) {
  throw new Error("Registry lookup failed for file-import-stack.");
}

if (!getLoadersByCategory("uploading").some((loader) => loader.id === "file-import-stack")) {
  throw new Error("Category lookup failed for file-import-stack.");
}

function App() {
  return (
    <main>
      {loaders.map((definition) => {
        const Loader = components[definition.componentName];

        return (
          <section key={definition.id}>
            <h2>{definition.name}</h2>
            <Loader message={definition.previewMessage} reducedMotion />
          </section>
        );
      })}
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
`
  );

  writeText(
    join(consumerDir, "src", "react-shim.d.ts"),
    `declare module "react" {
  export type ReactNode = unknown;
}
`
  );

  writeText(
    join(consumerDir, "src", "typecheck.ts"),
    `import {
  FileImportStack,
  getLoaderById,
  getLoadersByCategory,
  loaders,
  type LoaderComponent
} from "@arthav/open-loading";

const fileImportLoader: LoaderComponent = FileImportStack;
const uploadedLoaders = getLoadersByCategory("uploading");

if (!loaders.some((loader) => loader.componentName === "FileImportStack")) {
  throw new Error("FileImportStack is missing from registry metadata.");
}

if (!getLoaderById("file-import-stack")) {
  throw new Error("file-import-stack lookup failed.");
}

if (!uploadedLoaders.some((loader) => loader.id === "file-import-stack")) {
  throw new Error("file-import-stack category lookup failed.");
}

void fileImportLoader;
`
  );

  writeText(
    join(consumerDir, "src", "ssr-smoke.tsx"),
    `import React from "react";
import { renderToString } from "react-dom/server";
import {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots,
  loaders,
  type LoaderComponent
} from "@arthav/open-loading";

const components: Record<string, LoaderComponent> = {
  AIStream,
  ButtonHold,
  DataTableSkeleton,
  EmptySearch,
  ErrorRetry,
  FileImportStack,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  RouteReveal,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  ToolCallTrace,
  TypingDots
};

const html = renderToString(
  <main>
    {loaders.map((definition) => {
      const Loader = components[definition.componentName];

      return (
        <section key={definition.id}>
          <Loader message={definition.previewMessage} reducedMotion />
        </section>
      );
    })}
  </main>
);

if (!html.includes('role="status"')) {
  throw new Error("SSR output did not include loader status regions.");
}

if (!html.includes("Importing file...")) {
  throw new Error("SSR output did not include FileImportStack copy.");
}
`
  );

  run(pnpmCommand, ["install", "--ignore-scripts", "--no-frozen-lockfile"], consumerDir);
  run(pnpmCommand, ["run", "typecheck"], consumerDir);
  run(pnpmCommand, ["run", "build"], consumerDir);
  run(pnpmCommand, ["run", "ssr"], consumerDir);

  const relativeTemp = relative(workspaceRoot, tempRoot);
  console.log(`Tarball consumer smoke passed in ${relativeTemp}.`);
} finally {
  assertSafeTempPath(tempRoot);
  rmSync(tempRoot, { recursive: true, force: true });
}

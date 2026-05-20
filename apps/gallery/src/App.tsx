import {
  Activity,
  AlertTriangle,
  BookOpen,
  Bot,
  Box,
  Braces,
  CheckCircle2,
  CircleDashed,
  Code2,
  Copy,
  Cuboid,
  ExternalLink,
  FileCode2,
  Github,
  GitPullRequest,
  LayoutDashboard,
  Library,
  ListChecks,
  PackageCheck,
  Search,
  ShieldCheck,
  Star,
  TerminalSquare,
  Upload,
  UserRound,
  Zap
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AIStream,
  ErrorRetry,
  getLoaderById,
  getLoadersByCategory,
  loaders,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  TypingDots,
  type LoaderComponent,
  type LoaderDefinition,
  type LoaderProps,
  type LoaderType
} from "@arthav/open-loading";

const packageName = "@arthav/open-loading";
const repositoryUrl = "https://github.com/Arthav/open-loading";

const installSnippet = `npm install ${packageName}`;
const quickUsageSnippet = `import { ThinkingOrbit } from "${packageName}";

export function PendingState() {
  return (
    <ThinkingOrbit
      message="Analyzing your request..."
      size="lg"
      tone="brand"
    />
  );
}`;
const registrySnippet = `import { getLoaderById, loaders } from "${packageName}";

const loader = getLoaderById("thinking-orbit");
const aiLoaders = loaders.filter((item) => item.category === "ai-thinking");`;
const contributionSnippet = `pnpm install
pnpm dev
pnpm check`;

const componentMap: Record<string, LoaderComponent> = {
  AIStream,
  ErrorRetry,
  NeuralGalaxy,
  ProgressPulse,
  QueueBeacon,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  TypingDots
};

const categories: Array<{
  id: LoaderType;
  label: string;
  icon: typeof Activity;
}> = [
  { id: "inline", label: "Inline", icon: CircleDashed },
  { id: "page", label: "Page", icon: LayoutDashboard },
  { id: "skeleton", label: "Skeleton", icon: PackageCheck },
  { id: "ai-thinking", label: "AI Thinking", icon: Bot },
  { id: "uploading", label: "Uploading", icon: Upload },
  { id: "error", label: "Error", icon: AlertTriangle },
  { id: "empty", label: "Empty", icon: Box },
  { id: "waiting-room", label: "Waiting Room", icon: UserRound },
  { id: "experimental", label: "Experimental", icon: Cuboid }
];

const useCaseGroups: Array<{
  title: string;
  categories: LoaderType[];
  icon: typeof Activity;
  summary: string;
}> = [
  {
    title: "AI reasoning and streaming",
    categories: ["ai-thinking"],
    icon: Bot,
    summary:
      "Use for chat replies, planning states, token streams, and assistant work that needs visible intent."
  },
  {
    title: "Inline pending actions",
    categories: ["inline"],
    icon: CircleDashed,
    summary:
      "Use inside buttons, compact panels, and local fetches where the UI should stay lightweight."
  },
  {
    title: "Content placeholders",
    categories: ["skeleton"],
    icon: PackageCheck,
    summary:
      "Use when the final layout shape matters more than a centered spinner."
  },
  {
    title: "Uploads and imports",
    categories: ["uploading"],
    icon: Upload,
    summary:
      "Use for context uploads, imports, and multi-step jobs where progress should feel active."
  },
  {
    title: "Recoverable failures",
    categories: ["error"],
    icon: AlertTriangle,
    summary:
      "Use when a failed request can retry or recover while still announcing the error clearly."
  },
  {
    title: "Queues and waiting rooms",
    categories: ["waiting-room"],
    icon: UserRound,
    summary:
      "Use when the product is preserving a turn, slot, capacity window, or rate-limit position."
  },
  {
    title: "Expressive long-running work",
    categories: ["experimental"],
    icon: Cuboid,
    summary:
      "Use for creative generation and exploratory AI flows where a richer atmosphere is acceptable."
  }
];

const apiExports = [
  "ThinkingOrbit",
  "SimpleSpinner",
  "TypingDots",
  "ProgressPulse",
  "QueueBeacon",
  "SkeletonWave",
  "AIStream",
  "ErrorRetry",
  "NeuralGalaxy",
  "OpenLoadingStyles",
  "loaders",
  "getLoaderById",
  "getLoadersByCategory"
];

type InspectorTab = "Details" | "Props" | "Code" | "Schema";

function getComponent(definition: LoaderDefinition): LoaderComponent {
  return componentMap[definition.componentName] ?? ThinkingOrbit;
}

function getLoadersForUseCase(categoriesForUseCase: LoaderType[]) {
  return loaders.filter((loader) => categoriesForUseCase.includes(loader.category));
}

export function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<LoaderType>("ai-thinking");
  const [selectedId, setSelectedId] = useState("thinking-orbit");
  const [activeTab, setActiveTab] = useState<InspectorTab>("Details");
  const [search, setSearch] = useState("");
  const [messageEnabled, setMessageEnabled] = useState(true);
  const [errorEnabled, setErrorEnabled] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedLoader = getLoaderById(selectedId) ?? loaders[0];
  const SelectedComponent = getComponent(selectedLoader);

  useEffect(() => {
    const targetId = window.location.hash.replace("#", "");

    if (!targetId) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
  }, []);

  const visibleLoaders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return loaders.filter((loader) => {
      const matchesCategory = loader.category === selectedCategory;
      const matchesSearch =
        query.length === 0 ||
        [loader.name, loader.id, loader.type, ...loader.tags, ...loader.useCases]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const previewProps: LoaderProps = {
    message: messageEnabled ? selectedLoader.previewMessage : undefined,
    error:
      errorEnabled && selectedLoader.supportsError
        ? "Retry path armed"
        : false,
    size: "lg",
    tone: selectedLoader.type === "error" ? "danger" : "brand"
  };

  function chooseLoader(loader: LoaderDefinition) {
    setSelectedCategory(loader.category);
    setSelectedId(loader.id);
    setErrorEnabled(false);
  }

  function chooseCategory(category: LoaderType) {
    setSelectedCategory(category);
    const first = getLoadersByCategory(category)[0];

    if (first) {
      setSelectedId(first.id);
      setErrorEnabled(false);
    }
  }

  function openUseCase(categoriesForUseCase: LoaderType[]) {
    const first = getLoadersForUseCase(categoriesForUseCase)[0];

    if (first) {
      chooseLoader(first);
    } else {
      chooseCategory(categoriesForUseCase[0]);
    }

    const gallery = document.getElementById("gallery");

    if (typeof gallery?.scrollIntoView === "function") {
      gallery.scrollIntoView({ block: "start" });
    }
  }

  async function copySnippet(key: string, value: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    }

    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#gallery" aria-label="open-loading home">
          <span className="brandMark" aria-hidden="true" />
          <span>open-loading</span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a className="active" href="#gallery">
            Gallery
          </a>
          <a href="#use-cases">Use cases</a>
          <a href="#docs">Docs</a>
          <a href="#api">API</a>
          <a href="#contribute">Contribute</a>
          <a href={repositoryUrl} rel="noreferrer" target="_blank">
            GitHub <ExternalLink size={14} strokeWidth={1.8} />
          </a>
        </nav>
        <div className="topActions">
          <label className="searchBox">
            <Search size={17} />
            <input
              aria-label="Search loaders"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search loaders..."
              value={search}
            />
            <kbd>/</kbd>
          </label>
          <button
            className="repoButton"
            onClick={() => copySnippet("top-install", installSnippet)}
            type="button"
          >
            <Copy size={17} />
            <span>{copiedKey === "top-install" ? "Copied" : "Copy install"}</span>
          </button>
          <a
            className="repoButton"
            href={repositoryUrl}
            rel="noreferrer"
            target="_blank"
          >
            <Github size={18} />
            <span>Arthav/open-loading</span>
          </a>
        </div>
      </header>

      <main className="siteMain">
        <section className="workspace" id="gallery" aria-label="Loader gallery">
          <aside className="categoryRail" aria-label="Loader categories">
            <p className="railLabel">Categories</p>
            <div className="categoryList">
              {categories.map((category) => {
                const Icon = category.icon;
                const count = getLoadersByCategory(category.id).length;

                return (
                  <button
                    className={
                      category.id === selectedCategory
                        ? "categoryItem selected"
                        : "categoryItem"
                    }
                    key={category.id}
                    onClick={() => chooseCategory(category.id)}
                    type="button"
                  >
                    <Icon size={18} />
                    <span>{category.label}</span>
                    <small>{count}</small>
                  </button>
                );
              })}
            </div>
            <div className="railNote">
              <p>
                open-loading is a collection of accessible, composable loading
                states for React products and AI-agent era interfaces.
              </p>
              <span>
                <Braces size={15} /> Agent-safe schema
              </span>
              <span>
                <Star size={15} /> MIT licensed
              </span>
            </div>
          </aside>

          <section className="stageColumn" aria-label="Selected loader preview">
            <div className="stageHeader">
              <div>
                <a className="backLink" href="#use-cases">
                  Explore use cases
                </a>
                <div className="titleRow">
                  <h1>{selectedLoader.name}</h1>
                  <span>{selectedLoader.type}</span>
                </div>
                <p>{selectedLoader.agentNotes.addWhen}</p>
              </div>
              <div className="stageTools" aria-label="Preview tools">
                <button
                  className="iconButton"
                  onClick={() => setActiveTab("Code")}
                  type="button"
                  aria-label="View code"
                >
                  <Code2 size={18} />
                </button>
                <a className="iconButton" href="#docs" aria-label="Read documentation">
                  <BookOpen size={18} />
                </a>
                <a
                  className="iconButton"
                  href={repositoryUrl}
                  rel="noreferrer"
                  target="_blank"
                  aria-label="Open GitHub repository"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            <div className="loaderStage">
              <div className="stageStars" aria-hidden="true" />
              <SelectedComponent {...previewProps} />
            </div>

            <div className="controlStrip" aria-label="Preview controls">
              <label>
                <input
                  checked={messageEnabled}
                  onChange={(event) => setMessageEnabled(event.target.checked)}
                  type="checkbox"
                />
                Message
              </label>
              <label>
                <input
                  checked={errorEnabled}
                  disabled={!selectedLoader.supportsError}
                  onChange={(event) => setErrorEnabled(event.target.checked)}
                  type="checkbox"
                />
                Error mode
              </label>
              <span>{selectedLoader.motionLevel} motion</span>
              <span>{selectedLoader.complexity} complexity</span>
            </div>

            <div className="variantStrip" aria-label="Loader variants">
              {visibleLoaders.length > 0 ? (
                visibleLoaders.map((loader) => {
                  const Preview = getComponent(loader);

                  return (
                    <button
                      className={
                        loader.id === selectedId
                          ? "variantCard selected"
                          : "variantCard"
                      }
                      key={loader.id}
                      onClick={() => chooseLoader(loader)}
                      type="button"
                    >
                      <span className="miniPreview" aria-hidden="true">
                        <Preview reducedMotion size="sm" />
                      </span>
                      <strong>{loader.name}</strong>
                    </button>
                  );
                })
              ) : (
                <div className="emptyCategory">
                  <strong>No loaders in this category yet.</strong>
                  <span>Agent contributors can add one with the loader template.</span>
                </div>
              )}
            </div>
          </section>

          <aside className="inspector" aria-label="Loader inspector">
            <div className="tabs" role="tablist" aria-label="Inspector tabs">
              {(["Details", "Props", "Code", "Schema"] as InspectorTab[]).map(
                (tab) => (
                  <button
                    aria-selected={activeTab === tab}
                    className={activeTab === tab ? "active" : undefined}
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    role="tab"
                    type="button"
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            <InspectorContent loader={selectedLoader} tab={activeTab} />
          </aside>
        </section>

        <footer className="statusDock" aria-label="Library status">
          <a className="branchPicker" href={`${repositoryUrl}/tree/main`}>
            main
          </a>
          <StatusItem label={`${loaders.length} loaders`} />
          <StatusItem label="React 18/19" />
          <StatusItem label="Reduced motion" />
          <StatusItem label="MIT licensed" />
          <a className="contributeButton" href="#contribute">
            <Zap size={18} />
            Contribute a loader
          </a>
        </footer>

        <UseCasesSection openUseCase={openUseCase} />
        <DocsSection copiedKey={copiedKey} copySnippet={copySnippet} />
        <ApiSection copiedKey={copiedKey} copySnippet={copySnippet} />
        <ContributeSection copiedKey={copiedKey} copySnippet={copySnippet} />
      </main>
    </div>
  );
}

function StatusItem({ label }: { label: string }) {
  return (
    <span className="statusItem">
      <CheckCircle2 size={18} />
      {label}
    </span>
  );
}

function UseCasesSection({
  openUseCase
}: {
  openUseCase: (categoriesForUseCase: LoaderType[]) => void;
}) {
  return (
    <section className="siteSection useCasesSection" id="use-cases">
      <SectionHeader
        eyebrow="Use cases"
        title="Choose the loading state by the promise your UI is making."
        description="The registry groups loaders by product situation, so users and agents can pick a loader without guessing from visuals alone."
      />
      <div className="useCaseGrid">
        {useCaseGroups.map((group) => {
          const Icon = group.icon;
          const matchingLoaders = getLoadersForUseCase(group.categories);

          return (
            <button
              className="useCaseCard"
              key={group.title}
              onClick={() => openUseCase(group.categories)}
              type="button"
            >
              <span className="useCaseIcon" aria-hidden="true">
                <Icon size={21} />
              </span>
              <span className="useCaseMeta">
                {matchingLoaders.length} loader
                {matchingLoaders.length === 1 ? "" : "s"}
              </span>
              <strong>{group.title}</strong>
              <span>{group.summary}</span>
              <small>
                {matchingLoaders.map((loader) => loader.name).join(" / ")}
              </small>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DocsSection({
  copiedKey,
  copySnippet
}: {
  copiedKey: string | null;
  copySnippet: (key: string, value: string) => Promise<void>;
}) {
  return (
    <section className="siteSection docsSection" id="docs">
      <SectionHeader
        eyebrow="Documentation"
        title="Install once, render a loader with accessible defaults."
        description="Every loader shares the same prop contract, visible message behavior, live-region support, and reduced-motion handling."
      />
      <div className="docsGrid">
        <DocPanel
          icon={TerminalSquare}
          title="Install"
          action={
            <CopyButton
              copied={copiedKey === "install"}
              label="Copy"
              onClick={() => copySnippet("install", installSnippet)}
            />
          }
        >
          <CodeBlock code={installSnippet} />
          <p>
            The package expects React and React DOM 18.2.0 or newer in the
            consuming app.
          </p>
        </DocPanel>
        <DocPanel
          icon={Code2}
          title="Usage"
          action={
            <CopyButton
              copied={copiedKey === "quick-usage"}
              label="Copy"
              onClick={() => copySnippet("quick-usage", quickUsageSnippet)}
            />
          }
        >
          <CodeBlock code={quickUsageSnippet} />
        </DocPanel>
        <DocPanel icon={ShieldCheck} title="Accessibility">
          <div className="docList">
            <p>Root components render with role=status.</p>
            <p>Message text remains visible and announced through aria-live.</p>
            <p>Animations respect reducedMotion and prefers-reduced-motion.</p>
            <p>Error-aware loaders switch announcements to assertive copy.</p>
          </div>
        </DocPanel>
        <DocPanel
          icon={Library}
          title="Registry"
          action={
            <CopyButton
              copied={copiedKey === "registry"}
              label="Copy"
              onClick={() => copySnippet("registry", registrySnippet)}
            />
          }
        >
          <CodeBlock code={registrySnippet} />
          <p>
            Registry data powers this gallery, docs, validation, and contribution
            workflow.
          </p>
        </DocPanel>
      </div>
    </section>
  );
}

function ApiSection({
  copiedKey,
  copySnippet
}: {
  copiedKey: string | null;
  copySnippet: (key: string, value: string) => Promise<void>;
}) {
  const propDefinitions = loaders[0]?.props ?? [];

  return (
    <section className="siteSection apiSection" id="api">
      <SectionHeader
        eyebrow="API"
        title="A small React surface with metadata built in."
        description="Import loader components directly, or inspect registry definitions when you need to build picker UIs, docs, or agent workflows."
      />
      <div className="apiLayout">
        <div className="apiExports">
          <div className="sectionCardHeader">
            <h3>Exports</h3>
            <span>{apiExports.length} public exports</span>
          </div>
          <div className="exportGrid">
            {apiExports.map((exportName) => (
              <code key={exportName}>{exportName}</code>
            ))}
          </div>
        </div>
        <div className="apiProps">
          <div className="sectionCardHeader">
            <h3>LoaderProps</h3>
            <CopyButton
              copied={copiedKey === "api-usage"}
              label="Copy usage"
              onClick={() => copySnippet("api-usage", quickUsageSnippet)}
            />
          </div>
          <div className="propTable" role="table" aria-label="LoaderProps">
            {propDefinitions.map((prop) => (
              <div className="propTableRow" role="row" key={prop.name}>
                <code>{prop.name}</code>
                <span>{prop.type}</span>
                <p>{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributeSection({
  copiedKey,
  copySnippet
}: {
  copiedKey: string | null;
  copySnippet: (key: string, value: string) => Promise<void>;
}) {
  const contributionSteps = [
    "Start from templates/loader.",
    "Create one loader component inside packages/core/src/loaders.",
    "Add metadata in packages/core/src/registry/definitions.ts.",
    "Export the component from packages/core/src/loaders/index.ts.",
    "Add focused tests for rendering, message copy, and any error mode.",
    "Run pnpm check before opening a PR."
  ];

  return (
    <section className="siteSection contributeSection" id="contribute">
      <SectionHeader
        eyebrow="Contribute"
        title="Add one loader at a time and keep the metadata honest."
        description="The repo is designed for human and AI contributors, but new loaders still need a component, registry definition, accessibility notes, and local verification."
      />
      <div className="contributeLayout">
        <div className="contributeSteps">
          {contributionSteps.map((step, index) => (
            <div className="contributeStep" key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <div className="contributePanel">
          <div className="sectionCardHeader">
            <h3>Local gate</h3>
            <CopyButton
              copied={copiedKey === "contribution"}
              label="Copy"
              onClick={() => copySnippet("contribution", contributionSnippet)}
            />
          </div>
          <CodeBlock code={contributionSnippet} />
          <div className="linkGrid">
            <a href={`${repositoryUrl}/tree/main/templates/loader`}>
              <ListChecks size={17} />
              Loader template
            </a>
            <a href={`${repositoryUrl}/blob/main/AGENTS.md`}>
              <GitPullRequest size={17} />
              Agent rules
            </a>
            <a href={`${repositoryUrl}/issues`}>
              <Github size={17} />
              Issues
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  description,
  eyebrow,
  title
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="sectionHeader">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function DocPanel({
  action,
  children,
  icon: Icon,
  title
}: {
  action?: ReactNode;
  children: ReactNode;
  icon: typeof Activity;
  title: string;
}) {
  return (
    <article className="docPanel">
      <div className="sectionCardHeader">
        <h3>
          <Icon size={18} />
          {title}
        </h3>
        {action}
      </div>
      {children}
    </article>
  );
}

function CopyButton({
  copied,
  label,
  onClick
}: {
  copied: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="copyButton" onClick={onClick} type="button">
      <Copy size={15} />
      {copied ? "Copied" : label}
    </button>
  );
}

function InspectorContent({
  loader,
  tab
}: {
  loader: LoaderDefinition;
  tab: InspectorTab;
}) {
  if (tab === "Props") {
    return (
      <div className="inspectorBody">
        <PanelHeader loader={loader} />
        <div className="propList">
          {loader.props.map((prop) => (
            <div className="propRow" key={prop.name}>
              <strong>{prop.name}</strong>
              <span>{prop.type}</span>
              <p>{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "Code") {
    return (
      <div className="inspectorBody">
        <PanelHeader loader={loader} />
        <CodeBlock
          code={`import { ${loader.componentName} } from "${packageName}";

export function PendingState() {
  return (
    <${loader.componentName}
      message="${loader.previewMessage}"
      size="lg"
      tone="brand"
    />
  );
}`}
        />
      </div>
    );
  }

  if (tab === "Schema") {
    return (
      <div className="inspectorBody">
        <PanelHeader loader={loader} />
        <CodeBlock
          code={JSON.stringify(
            {
              component: loader.componentName,
              type: loader.type,
              useCases: loader.useCases,
              props: {
                message: loader.supportsMessage,
                error: loader.supportsError,
                motion: loader.motionLevel
              },
              agent: loader.agentNotes
            },
            null,
            2
          )}
        />
      </div>
    );
  }

  return (
    <div className="inspectorBody">
      <PanelHeader loader={loader} />
      <dl className="detailList">
        <Detail label="Type" value={loader.type} />
        <Detail label="Use case" value={loader.useCases.join(", ")} />
        <Detail label="Motion" value={loader.motionLevel} />
        <Detail label="Can show message" value={loader.supportsMessage ? "Yes" : "No"} />
        <Detail label="Can show error" value={loader.supportsError ? "Yes" : "No"} />
        <Detail label="Complexity" value={loader.complexity} />
        <Detail label="Package" value={loader.packageName} />
        <Detail label="Framework" value={loader.framework} />
      </dl>
      <section className="a11yBlock">
        <h2>Accessibility</h2>
        {loader.a11y.notes.map((note) => (
          <p key={note}>
            <CheckCircle2 size={16} />
            {note}
          </p>
        ))}
      </section>
      <section className="schemaPreview">
        <div>
          <h2>Agent-safe schema</h2>
        </div>
        <CodeBlock
          code={JSON.stringify(
            {
              component: loader.componentName,
              type: loader.type,
              useCase: loader.useCases,
              props: {
                message: loader.supportsMessage,
                error: loader.supportsError,
                motion: loader.motionLevel
              },
              a11y: {
                ariaLive: loader.a11y.ariaLive,
                reducedMotion: loader.a11y.reducedMotion
              }
            },
            null,
            2
          )}
        />
      </section>
    </div>
  );
}

function PanelHeader({ loader }: { loader: LoaderDefinition }) {
  return (
    <div className="panelHeader">
      <div>
        <h2>{loader.name}</h2>
        <span>{loader.id}</span>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="codeBlock">
      <FileCode2 size={16} />
      <code>{code}</code>
    </pre>
  );
}

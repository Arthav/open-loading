import {
  Activity,
  AlertTriangle,
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
  LayoutDashboard,
  Maximize2,
  Monitor,
  PackageCheck,
  Search,
  Sparkles,
  Star,
  Upload,
  UserRound,
  Zap
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  AIStream,
  ErrorRetry,
  getLoaderById,
  loaders,
  NeuralGalaxy,
  ProgressPulse,
  SimpleSpinner,
  SkeletonWave,
  ThinkingOrbit,
  TypingDots,
  type LoaderComponent,
  type LoaderDefinition,
  type LoaderProps,
  type LoaderType
} from "@open-loading/react";

const componentMap: Record<string, LoaderComponent> = {
  AIStream,
  ErrorRetry,
  NeuralGalaxy,
  ProgressPulse,
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

type InspectorTab = "Details" | "Props" | "Code" | "Schema";

function getComponent(definition: LoaderDefinition): LoaderComponent {
  return componentMap[definition.componentName] ?? ThinkingOrbit;
}

export function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<LoaderType>("ai-thinking");
  const [selectedId, setSelectedId] = useState("thinking-orbit");
  const [activeTab, setActiveTab] = useState<InspectorTab>("Details");
  const [search, setSearch] = useState("");
  const [messageEnabled, setMessageEnabled] = useState(true);
  const [errorEnabled, setErrorEnabled] = useState(false);

  const selectedLoader = getLoaderById(selectedId) ?? loaders[0];
  const SelectedComponent = getComponent(selectedLoader);

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

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#" aria-label="open-loading home">
          <span className="brandMark" aria-hidden="true" />
          <span>open-loading</span>
        </a>
        <nav className="topnav" aria-label="Primary navigation">
          <a className="active" href="#gallery">
            Gallery
          </a>
          <a href="#use-cases">Use cases</a>
          <a href="#agent-docs">Agent docs</a>
          <a href="#contribute">Contribute</a>
          <a href="#github">
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
            <kbd>⌘K</kbd>
          </label>
          <button className="iconButton" aria-label="Toggle visual theme">
            <Sparkles size={18} />
          </button>
          <button className="repoButton" type="button">
            <Github size={18} />
            <span>open-loading/core</span>
          </button>
        </div>
      </header>

      <main className="workspace" id="gallery">
        <aside className="categoryRail" aria-label="Loader categories">
          <p className="railLabel">Categories</p>
          <div className="categoryList">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = loaders.filter(
                (loader) => loader.category === category.id
              ).length;

              return (
                <button
                  className={
                    category.id === selectedCategory
                      ? "categoryItem selected"
                      : "categoryItem"
                  }
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    const first = loaders.find(
                      (loader) => loader.category === category.id
                    );

                    if (first) {
                      setSelectedId(first.id);
                      setErrorEnabled(false);
                    }
                  }}
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
              states for AI-agent era products.
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
              <a className="backLink" href="#gallery">
                Back to gallery
              </a>
              <div className="titleRow">
                <h1>{selectedLoader.name}</h1>
                <span>{selectedLoader.type}</span>
              </div>
              <p>{selectedLoader.agentNotes.addWhen}</p>
            </div>
            <div className="stageTools" aria-label="Preview tools">
              <button className="iconButton" type="button" aria-label="View code">
                <Code2 size={18} />
              </button>
              <button className="iconButton" type="button" aria-label="Desktop preview">
                <Monitor size={18} />
              </button>
              <button className="iconButton" type="button" aria-label="Fullscreen preview">
                <Maximize2 size={18} />
              </button>
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
                    onClick={() => {
                      setSelectedId(loader.id);
                      setErrorEnabled(false);
                    }}
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
      </main>

      <footer className="statusDock" aria-label="Contribution health">
        <button className="branchPicker" type="button">
          main
        </button>
        <StatusItem label="Schema valid" />
        <StatusItem label="Preview generated" />
        <StatusItem label="Tests passing (128)" />
        <StatusItem label="A11y passing" />
        <a className="contributeButton" href="#contribute">
          <Zap size={18} />
          Contribute a loader
        </a>
      </footer>
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
          code={`import { ${loader.componentName} } from "@open-loading/react";

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
          <button className="copyButton" type="button">
            <Copy size={15} />
            Copy
          </button>
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
      <button className="copyButton" type="button">
        <Copy size={15} />
        Copy
      </button>
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

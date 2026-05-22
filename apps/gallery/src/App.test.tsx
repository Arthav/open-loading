import { fireEvent, render, screen, within } from "@testing-library/react";
import { App } from "./App";

function renderRoute(route = "/") {
  window.history.replaceState(null, "", route);

  return render(<App />);
}

describe("gallery app", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: vi.fn()
    });
  });

  it("renders the cinematic loader stage on the default route", () => {
    renderRoute("/");

    expect(
      screen.getByRole("heading", { level: 1, name: "Thinking Orbit" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Selected loader preview")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.queryByText(/Install once, render a loader/i)).not.toBeInTheDocument();
  });

  it("renders the gallery page from /gallery", () => {
    const { container } = renderRoute("/gallery");

    expect(container.firstElementChild).toHaveClass("galleryApp");
    expect(screen.getByLabelText("Loader gallery")).toBeInTheDocument();
    expect(screen.getByLabelText("Search loaders")).toBeInTheDocument();
  });

  it("renders a selected loader from a direct gallery route", () => {
    renderRoute("/gallery/queue-beacon");

    expect(
      screen.getByRole("heading", { level: 1, name: "Queue Beacon" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "/gallery/queue-beacon" }))
      .toHaveAttribute("href", "/gallery/queue-beacon");
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("renders the page-level loader from its direct route", () => {
    renderRoute("/gallery/route-reveal");

    expect(
      screen.getByRole("heading", { level: 1, name: "Route Reveal" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Route reveal loading state" })
    ).toHaveTextContent("Preparing page...");
  });

  it("renders the compact button loader from its direct route", () => {
    renderRoute("/gallery/button-hold");

    expect(
      screen.getByRole("heading", { level: 1, name: "Button Hold" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Button hold loading state" })
    ).toHaveAttribute("data-layout", "inline");
  });

  it("renders the data table loader from its direct route", () => {
    renderRoute("/gallery/data-table-skeleton");

    expect(
      screen.getByRole("heading", { level: 1, name: "Data Table Skeleton" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Data table skeleton loading state" })
    ).toHaveTextContent("Loading rows...");
  });

  it("renders the empty search loader from its direct route", () => {
    renderRoute("/gallery/empty-search");

    expect(
      screen.getByRole("heading", { level: 1, name: "Empty Search" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Empty search loading state" })
    ).toHaveTextContent("Checking for matches...");
  });

  it("renders the AI tool-call loader from its direct route", () => {
    renderRoute("/gallery/tool-call-trace");

    expect(
      screen.getByRole("heading", { level: 1, name: "Tool Call Trace" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Tool call trace loading state" })
    ).toHaveTextContent("Calling tools...");
  });

  it("renders the file import loader from its direct route", () => {
    renderRoute("/gallery/file-import-stack");

    expect(
      screen.getByRole("heading", { level: 1, name: "File Import Stack" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "File import stack loading state" })
    ).toHaveTextContent("Importing file...");
  });

  it("changes selected loader from the variant strip", () => {
    renderRoute("/gallery");

    const variantStrip = screen.getByLabelText("Loader variants");
    fireEvent.click(
      within(variantStrip).getByRole("link", { name: /Typing Dots/i })
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Typing Dots" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Typing dots loading state" })
    ).toHaveTextContent("Composing response...");
    expect(window.location.pathname).toBe("/gallery/typing-dots");
  });

  it("shows schema details in the inspector", () => {
    renderRoute("/gallery");

    fireEvent.click(screen.getByRole("tab", { name: "Schema" }));

    expect(screen.getByText(/"component": "ThinkingOrbit"/)).toBeInTheDocument();
    expect(screen.getByText(/"schemaVersion": "1.0"/)).toBeInTheDocument();
  });

  it("renders the waiting-room loader from registry data", () => {
    renderRoute("/gallery");

    const categoryRail = screen.getByLabelText("Loader categories");
    fireEvent.click(
      within(categoryRail).getByRole("button", { name: /Waiting Room/i })
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Queue Beacon" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Queue beacon loading state" })
    ).toHaveTextContent("Holding your place...");
    expect(window.location.pathname).toBe("/gallery/queue-beacon");
  });

  it("updates the preview message live", () => {
    renderRoute("/gallery");

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Crunching tokens" }
    });

    expect(
      screen.getByRole("status", { name: "Thinking Orbit loading state" })
    ).toHaveTextContent("Crunching tokens");
  });

  it("updates loader size from the segmented controls", () => {
    renderRoute("/gallery");

    const status = screen.getByRole("status", {
      name: "Thinking Orbit loading state"
    });

    for (const size of ["SM", "MD", "LG"]) {
      fireEvent.click(screen.getByRole("radio", { name: size }));
      expect(status).toHaveAttribute("data-size", size.toLowerCase());
    }
  });

  it("updates loader tone from the swatch controls", () => {
    renderRoute("/gallery");

    const status = screen.getByRole("status", {
      name: "Thinking Orbit loading state"
    });

    for (const tone of ["Neutral", "Brand", "Success", "Warning", "Danger"]) {
      fireEvent.click(screen.getByRole("radio", { name: tone }));
      expect(status).toHaveAttribute("data-tone", tone.toLowerCase());
    }
  });

  it("toggles reduced motion on the preview", () => {
    renderRoute("/gallery");

    const status = screen.getByRole("status", {
      name: "Thinking Orbit loading state"
    });

    fireEvent.click(screen.getByLabelText("Reduced motion"));

    expect(status).toHaveAttribute("data-reduced-motion", "true");
  });

  it("enables error mode for error-capable loaders", () => {
    renderRoute("/gallery");

    fireEvent.click(screen.getByLabelText("Enable error mode"));
    fireEvent.change(screen.getByLabelText("Error message"), {
      target: { value: "Network paused" }
    });

    const status = screen.getByRole("status", {
      name: "Thinking Orbit loading state"
    });

    expect(status).toHaveTextContent("Network paused");
    expect(status).toHaveAttribute("data-tone", "danger");
  });

  it("disables error controls for loaders without error support", () => {
    renderRoute("/gallery");

    const categoryRail = screen.getByLabelText("Loader categories");
    fireEvent.click(within(categoryRail).getByRole("button", { name: /Inline/i }));

    expect(screen.getByLabelText("Enable error mode")).toBeDisabled();
    expect(screen.getByLabelText("Error message")).toBeDisabled();
  });

  it("resets the live preview controls to loader defaults", () => {
    renderRoute("/gallery");

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Temporary message" }
    });
    fireEvent.click(screen.getByRole("radio", { name: "MD" }));
    fireEvent.click(screen.getByRole("radio", { name: "Success" }));
    fireEvent.click(screen.getByLabelText("Reduced motion"));
    fireEvent.click(screen.getByLabelText("Enable error mode"));
    fireEvent.change(screen.getByLabelText("Class name"), {
      target: { value: "custom-loader-hook" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    const status = screen.getByRole("status", {
      name: "Thinking Orbit loading state"
    });

    expect(status).toHaveTextContent("Analyzing your request...");
    expect(status).toHaveAttribute("data-size", "lg");
    expect(status).toHaveAttribute("data-tone", "brand");
    expect(status).not.toHaveAttribute("data-reduced-motion");
    expect(status).not.toHaveClass("custom-loader-hook");
    expect(screen.getByLabelText("Enable error mode")).not.toBeChecked();
  });

  it("reflects live values in the code tab", () => {
    renderRoute("/gallery");

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Rendered code message" }
    });
    fireEvent.click(screen.getByRole("radio", { name: "Success" }));
    fireEvent.click(screen.getByLabelText("Reduced motion"));
    fireEvent.change(screen.getByLabelText("Class name"), {
      target: { value: "custom-loader-hook" }
    });
    fireEvent.click(screen.getByRole("tab", { name: "Code" }));

    expect(screen.getByText(/message=\{"Rendered code message"\}/)).toBeInTheDocument();
    expect(screen.getByText(/tone="success"/)).toBeInTheDocument();
    expect(screen.getAllByText(/reducedMotion/).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/className="custom-loader-hook"/)
    ).toBeInTheDocument();
  });

  it("renders use cases as its own route", () => {
    renderRoute("/use-cases");

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Choose the loading state by the promise/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Inline pending actions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Route and page initialization/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Search and empty handoff/i })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Loader gallery")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Search loaders")).not.toBeInTheDocument();
  });

  it("renders docs as its own route", () => {
    const { container } = renderRoute("/docs");

    expect(container.firstElementChild).not.toHaveClass("galleryApp");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Install once, render a loader/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText("npm install @arthav/open-loading")).toBeInTheDocument();
    expect(
      screen.getAllByText(/from "@arthav\/open-loading"/).length
    ).toBeGreaterThan(0);
    expect(screen.queryByLabelText("Loader gallery")).not.toBeInTheDocument();
  });

  it("renders api as its own route", () => {
    renderRoute("/api");

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /A small React surface/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText("ThinkingOrbit")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "LoaderProps" })).toBeInTheDocument();
    expect(screen.queryByLabelText("Loader gallery")).not.toBeInTheDocument();
  });

  it("renders contribute as its own route", () => {
    renderRoute("/contribute");

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Add one loader at a time/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Start from templates/loader.")).toBeInTheDocument();
    expect(screen.queryByLabelText("Loader gallery")).not.toBeInTheDocument();
  });

  it("selects a matching loader from a use-case card", () => {
    renderRoute("/use-cases");

    fireEvent.click(
      screen.getByRole("button", { name: /Inline pending actions/i })
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Simple Spinner" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Simple spinner loading state" })
    ).toHaveTextContent("Loading...");
    expect(window.location.pathname).toBe("/gallery/simple-spinner");
  });

  it("updates page content and active nav item from nav clicks", () => {
    renderRoute("/gallery");

    fireEvent.click(screen.getByRole("link", { name: "Docs" }));

    expect(window.location.pathname).toBe("/docs");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Install once, render a loader/i
      })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Loader gallery")).not.toBeInTheDocument();
  });
});

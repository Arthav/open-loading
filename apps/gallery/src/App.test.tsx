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
    renderRoute("/gallery");

    expect(screen.getByLabelText("Loader gallery")).toBeInTheDocument();
    expect(screen.getByLabelText("Search loaders")).toBeInTheDocument();
  });

  it("changes selected loader from the variant strip", () => {
    renderRoute("/gallery");

    const variantStrip = screen.getByLabelText("Loader variants");
    fireEvent.click(
      within(variantStrip).getByRole("button", { name: /Typing Dots/i })
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Typing Dots" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Typing dots loading state" })
    ).toHaveTextContent("Composing response...");
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
    expect(screen.queryByLabelText("Loader gallery")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Search loaders")).not.toBeInTheDocument();
  });

  it("renders docs as its own route", () => {
    renderRoute("/docs");

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
    expect(window.location.pathname).toBe("/gallery");
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

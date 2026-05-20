import { fireEvent, render, screen, within } from "@testing-library/react";
import { App } from "./App";

describe("gallery app", () => {
  it("renders the cinematic loader stage", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Thinking Orbit" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Selected loader preview")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Choose the loading state by the promise/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Install once, render a loader/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /A small React surface/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Add one loader at a time/i
      })
    ).toBeInTheDocument();
  });

  it("changes selected loader from the variant strip", () => {
    render(<App />);

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
    render(<App />);

    fireEvent.click(screen.getByRole("tab", { name: "Schema" }));

    expect(screen.getByText(/"component": "ThinkingOrbit"/)).toBeInTheDocument();
    expect(screen.getByText(/"schemaVersion": "1.0"/)).toBeInTheDocument();
  });

  it("renders the waiting-room loader from registry data", () => {
    render(<App />);

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

  it("uses the published package name in docs and code snippets", () => {
    render(<App />);

    expect(screen.getByText("npm install @arthav/open-loading")).toBeInTheDocument();
    expect(
      screen.getAllByText(/from "@arthav\/open-loading"/).length
    ).toBeGreaterThan(0);
  });

  it("selects a matching loader from a use-case card", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: /Inline pending actions/i })
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Simple Spinner" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Simple spinner loading state" })
    ).toHaveTextContent("Loading...");
  });
});

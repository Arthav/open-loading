import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./App";

describe("gallery app", () => {
  it("renders the cinematic loader stage", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Thinking Orbit" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Selected loader preview")).toBeInTheDocument();
  });

  it("changes selected loader from the variant strip", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Typing Dots/i }));

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

    fireEvent.click(screen.getByRole("button", { name: /Waiting Room/i }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Queue Beacon" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "Queue beacon loading state" })
    ).toHaveTextContent("Holding your place...");
  });
});

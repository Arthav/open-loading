import { render, screen } from "@testing-library/react";
import { LoaderName } from "./LoaderName";

describe("LoaderName", () => {
  it("renders an accessible status", () => {
    render(<LoaderName message="Working" reducedMotion />);

    expect(screen.getByRole("status")).toHaveTextContent("Working");
  });
});

import Page from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("default test", () => {
  it("default test", () => {
    expect(1).toBe(1);
  });

  it("renders a heading", () => {
    render(<Page />);
    expect(screen.getByRole("heading")).toHaveTextContent("Home");
  });

  it("renders a link", () => {
    render(<Page />);
    expect(screen.getByRole("link")).toHaveTextContent("About");
  });
});

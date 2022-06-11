import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders GUARDRAILS label", () => {
  render(<App />);
  const labelElement = screen.getByText(/GUARDRAILS/i);
  expect(labelElement).toBeInTheDocument();
});

test("renders img and button(enabled) elements on page", () => {
  render(<App />);

  expect(screen.getByRole("img")).toBeInTheDocument();

  expect(screen.getByText("Load Template")).toBeInTheDocument();
  expect(screen.getByText("Load Template")).toBeEnabled();

  expect(screen.getByText("ADD")).toBeInTheDocument();
  expect(screen.getByText("ADD")).toBeEnabled();
});

test("renders table of ssr records on container", () => {
  const { container } = render(<App />);
  const table = container.getElementsByClassName(
    "sixteen wide computer column"
  );
  expect(table.length).toBe(2);
});

import {
  describe,
  it,
  expect,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renders dashboard text", () => {
    render(<Sidebar />);

    expect(
      screen.getByText(
        /dashboard/i
      )
    ).toBeInTheDocument();
  });

  it("renders Kanvix title", () => {
    render(<Sidebar />);

    expect(
      screen.getByText(
        /kanvix/i
      )
    ).toBeInTheDocument();
  });

  it("renders sidebar description", () => {
    render(<Sidebar />);

    expect(
      screen.getByText(
        /gestão inteligente de tarefas/i
      )
    ).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Sidebar />);

    expect(
      screen.getByLabelText(
        /abrir menu/i
      )
    ).toBeInTheDocument();
  });
});
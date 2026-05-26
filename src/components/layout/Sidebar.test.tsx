import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renders dashboard text", () => {
    render(<Sidebar />);

    expect(
      screen.getByText(/dashboard/i)
    ).toBeInTheDocument();
  });

  it("renders Kanvix title", () => {
    render(<Sidebar />);

    expect(
      screen.getAllByText(/kanvix/i)[0]
    ).toBeInTheDocument();
  });

  it("renders sidebar description", () => {
    render(<Sidebar />);

    expect(
      screen.getByText(
        /gestão inteligente/i
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

  it("opens mobile sidebar when clicking menu button", () => {
    render(<Sidebar />);

    const button =
      screen.getByLabelText(
        /abrir menu/i
      );

    fireEvent.click(button);

    expect(
      screen.getByLabelText(
        /fechar menu/i
      )
    ).toBeInTheDocument();
  });

  it("closes mobile sidebar when clicking overlay", () => {
    render(<Sidebar />);

    const openButton =
      screen.getByLabelText(
        /abrir menu/i
      );

    fireEvent.click(openButton);

    const overlay =
      screen.getByLabelText(
        /fechar menu/i
      );

    fireEvent.click(overlay);

    expect(
      screen.queryByLabelText(
        /fechar menu/i
      )
    ).not.toBeInTheDocument();
  });
});
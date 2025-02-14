import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { vi } from "vitest";

describe("Button Component", () => {
  test("renders children correctly", () => {    
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("applies the correct class when 'primary' is true", () => {
    render(<Button primary>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("border-blue-500 bg-blue-500 text-white");
  });

  test("applies the correct class when 'secondary' is true", () => {
    render(<Button secondary>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("border-gray-900 bg-gray-900 text-white");
  });

  test("calls 'onClick' when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call 'onClick' when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>
    );
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("applies 'disabled' attribute when disabled", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeDisabled();
  });

  test("only allows one variation prop (primary, secondary, etc.) at a time", () => {
    // This test ensures the prop-types validation works
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Button primary secondary>Click Me</Button>);
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  test("applies outline styles correctly", () => {
    render(<Button outline primary>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-white text-blue-500");
  });

  test("applies rounded styles correctly", () => {
    render(<Button rounded>Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("rounded-full");
  });
});

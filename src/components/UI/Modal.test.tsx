import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";
import { beforeAll, vi } from "vitest";


describe("Modal Component", () => {
    beforeAll(() => {
        const modalRoot = document.createElement("div");
        modalRoot.setAttribute("id", "modal-root");
        document.body.appendChild(modalRoot);
    });

    test("renders children correctly", () => {
        render(<Modal isOpen={true} onClose={() => {}}>Hello World</Modal>);
        expect(document.body).toHaveTextContent("Hello World");
    });

    test("does not render if 'isOpen' is false", () => {
        render(<Modal isOpen={false} onClose={() => {}}>Hello World</Modal>);
        expect(document.body).not.toHaveTextContent("Hello World");
    });

    test("renders when isOpen is true", () => {
        render(<Modal isOpen={true} onClose={() => {}}>Hello World</Modal>);
        expect(document.body).toHaveTextContent("Hello World");
    });

    test("calls onClose when clicking the overlay", () => {
        const onClose = vi.fn();

        render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);

        fireEvent.click(screen.getByText("Content").closest("div")!.parentElement!);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("calls on Close when clicking the close button", () => {
        const onClose = vi.fn();

        render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);

        fireEvent.click(screen.getByText("✖"));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("doest not call onClose when clicking inside the modal content", () => {
        const onClose = vi.fn();

        render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);

        fireEvent.click(screen.getByText("Content"));
        expect(onClose).not.toHaveBeenCalled();
    });
});
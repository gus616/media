import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { CgAbstract } from "react-icons/cg";

describe("Navbar Component", () => {
    test("renders the icon and title correctly", () => {
        render(<Navbar title='Mediafy' Icon={CgAbstract} />);

        // Check if the title "Mediafy" is rendered
        expect(screen.getByText("Mediafy")).toBeInTheDocument();
    });
});

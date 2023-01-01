import React from "react";
import renderer from "react-test-renderer";
import Fake from "src/app/sub_module/fake";
import { render, screen } from "@testing-library/react";

test("Fake component matches the snapshot", () => {
    const component = renderer.create(<Fake />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Fake display contains the word Testing", () => {
    render(<Fake />);
    expect(screen.getByRole("heading").textContent).toEqual("Testing");
});

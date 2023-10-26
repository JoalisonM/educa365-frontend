import { render } from "@testing-library/react";

import { Button } from ".";

describe("Button component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
        <Button type="button">Deletar</Button>,
    );

    expect(getByText("Deletar")).toBeInTheDocument();
  });
});

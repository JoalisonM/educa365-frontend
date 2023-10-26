import { render } from "@testing-library/react";
import { EditTabs } from ".";

jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({
      state: { id: "72feeeed-a6f6-49a8-9eb6-15c16e1dc53a" },
    }),
  };
});

jest.mock("@hooks/useStudent");

describe("EditTabs component", () => {
  it("renders correctly", () => {
    const { debug } = render(
      <EditTabs />,
    );

    debug();

    // expect(getByText("Deletar")).toBeInTheDocument();
  });
});

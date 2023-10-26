import { render } from "@testing-library/react";

import { AlertDialog } from ".";
import { Button } from "@components/Button";

describe("Alert component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <AlertDialog
        id="72feeeed-a6f6-49a8-9eb6-15c16e1dc53a"
        title="Você tem certeza absoluta?"
        description="Essa ação não pode ser desfeita. Isso excluirá permanentemente o funcionário."
        onDelete={() => {}}
      >
        <Button type="button">Deletar</Button>
      </AlertDialog>,
    );

    expect(getByText("Deletar")).toBeInTheDocument();
  });
});

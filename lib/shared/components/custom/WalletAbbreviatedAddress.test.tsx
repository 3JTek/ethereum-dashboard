import { render, screen } from "@testing-library/react";

import WalletAbbreviatedAddress from "./WalletAbbreviatedAddress";

describe("WalletAbbreviatedAddress", () => {
  it("should render the abbreviated address correctly", () => {
    const address = "0x1234567890abcdef1234567890abcdef12345678";

    render(<WalletAbbreviatedAddress address={address} />);

    expect(screen.getByTestId("wallet-address").textContent).toEqual("0x12345...45678");
  });

  it("should render an empty string if no address is provided", () => {
    render(<WalletAbbreviatedAddress address={"" as `0x${string}`} />);

    expect(screen.getByTestId("wallet-address").textContent).toBe("");
  });
});

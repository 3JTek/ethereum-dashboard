import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { useAccount, UseAccountReturnType, useBalance, UseBalanceReturnType } from "wagmi";

import { TokenInfo, tokens } from "@/lib/shared/contracts/tokens";
import { fakeWalletA } from "@/lib/shared/wallet/mocks/walletMock";

import BalanceItem from "./BalanceItem";

vi.mock("wagmi", () => ({
  useAccount: vi.fn(),
  useBalance: vi.fn(),
}));

const mockedUseAccount = vi.mocked(useAccount);
const mockedUseBalance = vi.mocked(useBalance);

describe("BalanceItem", () => {
  const mockToken: TokenInfo = {
    symbol: tokens.usdc.symbol,
    address: tokens.usdc.address,
  };

  beforeAll(() => {
    mockedUseAccount.mockReturnValue({ address: fakeWalletA } as UseAccountReturnType);
  });

  it("renders a skeleton when balance is pending", () => {
    mockedUseBalance.mockReturnValue({ data: undefined, isPending: true, error: null } as UseBalanceReturnType);

    render(<BalanceItem token={mockToken} />);

    expect(screen.getByTestId("balance-value-skeleton")).toBeInTheDocument();
  });

  it("renders the balance when data is available", () => {
    mockedUseBalance.mockReturnValue({
      data: { value: "1280000000000000000", decimals: 18 } as unknown,
      isPending: false,
      error: null,
    } as UseBalanceReturnType);

    render(<BalanceItem token={mockToken} />);

    expect(screen.getByText("1.28")).toBeInTheDocument();
  });

  it("renders an error message when there is an error", () => {
    mockedUseBalance.mockReturnValue({ data: undefined, isPending: false, error: new Error("Rate limit reached") } as UseBalanceReturnType);

    render(<BalanceItem token={mockToken} />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("renders no balance if address is falsy", () => {
    mockedUseAccount.mockReturnValue({ address: undefined } as UseAccountReturnType);

    render(<BalanceItem token={mockToken} />);

    expect(screen.getByText(mockToken.symbol)).toBeInTheDocument();
    expect(screen.getByTestId("balance-value").childNodes.length).toBe(0);
  });
});

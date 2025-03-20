import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  useAccount,
  UseAccountReturnType,
  useBalance,
  UseBalanceReturnType,
  useConnect,
  UseConnectReturnType,
  useDisconnect,
  UseDisconnectReturnType,
  useEnsName,
  UseEnsNameReturnType,
} from "wagmi";

import ApiClientProvider from "@/lib/shared/api/providers/ApiClientProvider";
import { tokens, TokenSymbol } from "@/lib/shared/contracts/tokens";
import balanceFixture from "@/lib/shared/wallet/fixtures/balanceFixture";
import { fakeWalletA } from "@/lib/shared/wallet/mocks/walletMock";

import Swap from "./Swap";

vi.mock("@/lib/shared/config/tokensEnabled", () => ({
  default: [tokens.ether, tokens.usdc],
}));

vi.mock("wagmi", () => ({
  useAccount: vi.fn(),
  useEnsName: vi.fn(),
  useDisconnect: vi.fn(),
  useConnect: vi.fn(),
  useBalance: vi.fn(),
}));

const mockedUseAccount = vi.mocked(useAccount);
const mockedUseEnsName = vi.mocked(useEnsName);
const mockedUseDisconnect = vi.mocked(useDisconnect);
const mockedUseConnect = vi.mocked(useConnect);
const mockedUseBalance = vi.mocked(useBalance);

const mockDisconnect = vi.fn();

describe("Swap preparation", () => {
  beforeAll(() => {
    mockedUseConnect.mockReturnValue({ connectors: [] } as unknown as UseConnectReturnType);
    mockedUseAccount.mockReturnValue({ address: fakeWalletA } as unknown as UseAccountReturnType);
    mockedUseDisconnect.mockReturnValue({ disconnect: mockDisconnect } as unknown as UseDisconnectReturnType);
    mockedUseEnsName.mockReturnValue({ data: null } as UseEnsNameReturnType);
    mockedUseBalance.mockReturnValue(balanceFixture() as unknown as UseBalanceReturnType);
  });

  it("renders by default the form without any token or amount set", () => {
    render(
      <ApiClientProvider>
        <Swap />
      </ApiClientProvider>
    );

    expect(screen.getByText(/select a token to sell/i)).toBeInTheDocument();
    expect(screen.getByText(/select a token to buy/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/0/i)).toBeInTheDocument();
  });

  it("should display the balance related to the token selected to sell", async () => {
    mockedUseBalance.mockReturnValue(balanceFixture(BigInt("456000000"), TokenSymbol.USDC) as unknown as UseBalanceReturnType);

    render(
      <ApiClientProvider>
        <Swap />
      </ApiClientProvider>
    );

    const fromTokenDorpDown = screen.getByRole("combobox", {
      name: "from-token-select",
    });

    await userEvent.click(fromTokenDorpDown);

    const ethOption = screen.getByRole("option", { name: "USDC" });

    await userEvent.click(ethOption);

    screen.getByText("456");
  });
});

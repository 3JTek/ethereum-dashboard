import { fakeWalletA } from "@/lib/shared/wallet/mocks/walletMock";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  useAccount,
  UseAccountReturnType,
  useConnect,
  UseConnectReturnType,
  useDisconnect,
  UseDisconnectReturnType,
  useEnsName,
  UseEnsNameReturnType,
} from "wagmi";

import WalletConnect from "./WalletConnect";

vi.mock("wagmi", () => ({
  useAccount: vi.fn(),
  useEnsName: vi.fn(),
  useDisconnect: vi.fn(),
  useConnect: vi.fn(),
}));

const mockedUseAccount = vi.mocked(useAccount);
const mockedUseEnsName = vi.mocked(useEnsName);
const mockedUseDisconnect = vi.mocked(useDisconnect);
const mockedUseConnect = vi.mocked(useConnect);

const mockDisconnect = vi.fn();

describe("WalletConnect", () => {
  beforeAll(() => {
    mockedUseConnect.mockReturnValue({ connectors: [] } as unknown as UseConnectReturnType);
    mockedUseDisconnect.mockReturnValue({ disconnect: mockDisconnect } as unknown as UseDisconnectReturnType);
  });

  it("renders a 'connect' message when no address is connected", () => {
    mockedUseAccount.mockReturnValue({ address: undefined } as UseAccountReturnType);
    mockedUseEnsName.mockReturnValue({ data: null } as UseEnsNameReturnType);

    render(<WalletConnect />);

    expect(screen.getByText(/Connect your Ethereum wallet to get started/i)).toBeInTheDocument();
  });

  it("renders wallet address and disconnect button when address is connected", () => {
    mockedUseAccount.mockReturnValue({ address: fakeWalletA } as UseAccountReturnType);
    mockedUseEnsName.mockReturnValue({ data: null } as UseEnsNameReturnType);

    render(<WalletConnect />);

    expect(screen.getByText(/54979/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Disconnect/ })).toBeInTheDocument();
  });

  it("renders ENS name if available", () => {
    const mockEnsName = "me.eth";
    mockedUseEnsName.mockReturnValue({ data: mockEnsName } as UseEnsNameReturnType);

    render(<WalletConnect />);

    expect(screen.getByText(mockEnsName)).toBeInTheDocument();
  });

  it("calls disconnect function when disconnect button is clicked", async () => {
    render(<WalletConnect />);

    await userEvent.click(screen.getByText("Disconnect"));

    expect(mockDisconnect).toHaveBeenCalled();
  });
});

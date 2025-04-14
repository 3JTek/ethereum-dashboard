import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import backendApi from "@/lib/client/shared/api/backend-api";
import ApiClientProvider from "@/lib/client/shared/api/providers/ApiClientProvider";
import { fakeWalletA } from "@/lib/client/shared/wallet/mocks/walletMock";

import Ens from "./Ens";

vi.mock("@/lib/client/shared/api/backend-api");

const mockedBackendApi = vi.mocked(backendApi);

const EnsComponent = () => {
  return (
    <ApiClientProvider>
      <Ens />
    </ApiClientProvider>
  );
};

describe("Ens Component", () => {
  it("renders without crashing", () => {
    render(<EnsComponent />);
    expect(screen.getByText(/Ethereum Address Lookup/i)).toBeInTheDocument();
  });

  describe("Happy paths", () => {
    it("returns the ens name of a given wallet address", async () => {
      mockedBackendApi.getEns.mockResolvedValueOnce("vitalik.eth");

      render(<EnsComponent />);

      const inputField = screen.getByPlaceholderText("0x... or name.eth");

      await userEvent.type(inputField, fakeWalletA);

      const submitButton = screen.getByRole("button", { name: /Search/i });

      await userEvent.click(submitButton);

      waitFor(() => {
        expect(screen.getByTestId("ens-result")).toBeInTheDocument();
        expect(screen.getByTestId("name-result")).not.toBeInTheDocument();
        expect(screen.getByText("vitalik.eth")).toBeInTheDocument();
      });
    });

    it("returns the wallet address of a given ens name", async () => {
      mockedBackendApi.getEns.mockResolvedValueOnce(fakeWalletA);

      render(<EnsComponent />);

      const inputField = screen.getByPlaceholderText("0x... or name.eth");

      await userEvent.type(inputField, "vitalik.eth");

      const submitButton = screen.getByRole("button", { name: /Search/i });

      await userEvent.click(submitButton);

      waitFor(() => {
        expect(screen.getByTestId("name-result")).toBeInTheDocument();
        expect(screen.getByTestId("ens-result")).not.toBeInTheDocument();
        expect(screen.getByText(fakeWalletA)).toBeInTheDocument();
      });
    });
  });

  describe("Error handling", () => {
    it("should display an error if api response is null for searched address/ens name", async () => {
      mockedBackendApi.getEns.mockResolvedValue(null);

      render(<EnsComponent />);

      const inputField = screen.getByPlaceholderText("0x... or name.eth");

      await userEvent.type(inputField, "<none-existing-ens-name>.eth");

      let submitButton = screen.getByRole("button", { name: /Search/i });

      await userEvent.click(submitButton);

      waitFor(() => {
        expect(screen.getByTestId("no-result")).toBeInTheDocument();
      });

      await userEvent.type(inputField, fakeWalletA);

      submitButton = screen.getByRole("button", { name: /Search/i });

      await userEvent.click(submitButton);

      waitFor(() => {
        expect(screen.getByTestId("no-result")).toBeInTheDocument();
      });
    });

    it("should display an error if searched input is neither an address or an Ens name", async () => {
      render(<EnsComponent />);

      const inputField = screen.getByPlaceholderText("0x... or name.eth");

      await userEvent.type(inputField, "not-a-valid-ens-name");

      const submitButton = screen.getByRole("button", { name: /Search/i });

      await userEvent.click(submitButton);

      expect(screen.getByText(/Invalid ENS name or Ethereum address/i)).toBeInTheDocument();

      await userEvent.clear(inputField);
      await userEvent.type(inputField, "valid.eth");

      expect(screen.queryByText(/Invalid ENS name or Ethereum address/i)).not.toBeInTheDocument();

      await userEvent.type(inputField, "0x123445565-not-a-valid-wallet-address");

      expect(screen.getByText(/Invalid ENS name or Ethereum address/i)).toBeInTheDocument();
    });
  });
});

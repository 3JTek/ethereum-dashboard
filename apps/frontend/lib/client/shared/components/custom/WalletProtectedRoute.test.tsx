import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useAccount, UseAccountReturnType } from "wagmi";

import WalletProtectedRoute from "./WalletProtectedRoute";

const mockRouter = {
  push: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

vi.mock("wagmi", () => ({
  useAccount: vi.fn(),
}));

const mockedUseAccount = vi.mocked(useAccount);

describe("WalletProtectedRoute", () => {
  it("renders the child component when wallet is connected", () => {
    mockedUseAccount.mockReturnValue({ isConnected: true, isConnecting: false } as UseAccountReturnType);

    const ChildComponent = () => <div>Protected Content</div>;

    const { getByText } = render(
      <WalletProtectedRoute>
        <ChildComponent />
      </WalletProtectedRoute>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login when wallet is not connected", () => {
    mockedUseAccount.mockReturnValue({ isConnected: false, isConnecting: false } as UseAccountReturnType);

    const { queryByText } = render(
      <WalletProtectedRoute>
        <div>Protected Content</div>
      </WalletProtectedRoute>
    );

    expect(queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("display loading state while connecting", () => {
    mockedUseAccount.mockReturnValue({ isConnected: false, isConnecting: true } as UseAccountReturnType);

    render(
      <WalletProtectedRoute>
        <div>Protected Content</div>
      </WalletProtectedRoute>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("skeleton-list-item")).toBeInTheDocument();
  });

  it("redirect to main page page when alert dialog CTA button is clicked", async () => {
    mockedUseAccount.mockReturnValue({ isConnected: false, isConnecting: false } as UseAccountReturnType);

    const { getByText } = render(
      <WalletProtectedRoute>
        <div>Protected Content</div>
      </WalletProtectedRoute>
    );

    const alertDialogButton = getByText(/go to dashboard/i);

    await userEvent.click(alertDialogButton);

    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});

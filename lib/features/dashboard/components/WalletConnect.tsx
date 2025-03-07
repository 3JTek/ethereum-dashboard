"use client";

import { useAccount, useDisconnect, useEnsName } from "wagmi";

import Header from "@/lib/shared/components/custom/Header";
import WalletAbbreviatedAddress from "@/lib/shared/components/custom/WalletAbbreviatedAddress";
import { Button } from "@/lib/shared/components/shadcn-ui/button";

import WalletSelectionList from "./WalletSelectionList";

const WalletConnect = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <div>
      <div className="mb-4">
        <Header type="h2">Your Wallet</Header>
      </div>
      <div className="flex flex-1 flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-[#325567] dark:bg-[#111c22] p-5 @[480px]:flex-row @[480px]:items-center">
        {address ? (
          <>
            <div className="flex">
              {ensName && <p>{ensName}</p>}
              <WalletAbbreviatedAddress address={address} />
            </div>
            <Button variant="destructive" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </>
        ) : (
          <>
            <p className="text-center font-bold leading-tight">Connect your Ethereum wallet to get started</p>
            <WalletSelectionList />
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;

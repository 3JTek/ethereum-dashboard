"use client";

import { Button } from "@lib/client/shared/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lib/client/shared/components/shadcn-ui/dialog";
import { Connector, useConnect } from "wagmi";

const connectorIconsSrc = {
  metamask: "/icons/metamask.png",
  coinbase: "/icons/coinbase.png",
  walletConnect: "/icons/wallet-connect.png",
};

const WalletSelectionList = () => {
  const { connectors, connect } = useConnect();

  const addWalletIcon = (connector: Connector): Connector => {
    if (connector.id === "metaMaskSDK") {
      return { ...connector, icon: connectorIconsSrc.metamask };
    } else if (connector.id === "coinbaseWalletSDK") {
      return { ...connector, icon: connectorIconsSrc.coinbase };
    } else if (connector.id === "walletConnect") {
      return { ...connector, icon: connectorIconsSrc.walletConnect };
    } else {
      return connector;
    }
  };

  const connectorsWithIcons = connectors.map(addWalletIcon);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect your wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select your wallet</DialogTitle>
          <DialogDescription>Pick the wallet you want to connect.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {connectorsWithIcons.map((connector) => (
            <Button className="w-full" key={connector.uid} onClick={() => connect({ connector })}>
              {connector.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="h-full" src={connector.icon} alt="wallet-icon"></img>
              )}
              <p className="text-center">{connector.name}</p>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelectionList;

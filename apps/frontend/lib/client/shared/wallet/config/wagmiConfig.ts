import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

import { WALLET_CONNECT_PROJECT_ID } from "@/lib/client/config/environment";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const projectId = WALLET_CONNECT_PROJECT_ID;

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [walletConnect({ projectId }), metaMask(), coinbaseWallet()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export default wagmiConfig;

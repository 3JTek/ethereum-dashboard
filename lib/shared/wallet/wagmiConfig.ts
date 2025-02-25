import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const projectId = "0d8f38a3d8c7e8b5c5fdbd53237c341b";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [walletConnect({ projectId }), metaMask(), coinbaseWallet()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export default wagmiConfig;

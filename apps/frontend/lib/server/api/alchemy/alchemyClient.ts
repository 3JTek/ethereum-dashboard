import { Alchemy, Network } from "alchemy-sdk";

import { ALCHEMY_API_KEY } from "../../config/environment";


const config = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
  connectionInfoOverrides: {
    skipFetchSetup: true,
  },
};

const alchemyClient = new Alchemy(config);

export default alchemyClient;

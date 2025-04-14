import { Wallet } from "@/lib/common/types/wallet";

import alchemyClient from "./alchemyClient";

async function getEnsFromAddress(address: Wallet): Promise<string | null> {
  const ensName = await alchemyClient.core.lookupAddress(address);

  return ensName;
}

export default getEnsFromAddress;

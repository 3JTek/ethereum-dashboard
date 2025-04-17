import alchemyClient from "./alchemyClient";

async function getAddressFromLookup(ensName: string): Promise<string | null> {
  const address = await alchemyClient.core.resolveName(ensName);

  return address;
}

export default getAddressFromLookup;

import { EnsName } from "@/lib/common/types/ensName";
import { Wallet } from "@/lib/common/types/wallet";

import clientAgent from "../clientAgent";

export enum EnsSearchType {
  LOOKUP = "lookup",
  REVERSE = "reverse",
}

export const getEns = async (searchInput: Wallet | EnsName, searchType: EnsSearchType): Promise<string | null> => {
  const response = await clientAgent.get<string | null>(`/api/ens?searchInput=${searchInput}&searchType=${searchType}`);

  return response;
};

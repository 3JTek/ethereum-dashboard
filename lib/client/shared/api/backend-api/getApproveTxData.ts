import { TokenAddress } from "@/lib/common/contracts/tokens";
import { OneInchGetSwapDataResponse } from "@/lib/server/api/one-inch/getSwapData";

import clientAgent from "../clientAgent";

export const getApproveTxData = async (tokenAddress: TokenAddress, amount: number): Promise<OneInchGetSwapDataResponse> => {
  const response = await clientAgent.get<OneInchGetSwapDataResponse>(
    `/api/swap/approve/transaction?tokenAddress=${tokenAddress}&amount=${amount}`
  );

  return response;
};

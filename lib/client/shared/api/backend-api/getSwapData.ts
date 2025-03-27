import { OneInchGetSwapDataResponse } from "@lib/server/api/one-inch/getSwapData";
import { parseUnits } from "viem";

import { TokenInfo } from "@/lib/common/contracts/tokens";

import clientAgent from "../clientAgent";

export const getSwapData = async (
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amount: number,
  wallet: string
): Promise<OneInchGetSwapDataResponse> => {
  const amountInBaseUnits = parseUnits(amount.toString(), fromToken.decimals).toString();

  const response = await clientAgent.get<{ data: OneInchGetSwapDataResponse }>(
    `/api/swap/swap?srcToken=${fromToken.address}&dstToken=${toToken.address}&amount=${amountInBaseUnits}&wallet=${wallet}`
  );

  return response.data;
};

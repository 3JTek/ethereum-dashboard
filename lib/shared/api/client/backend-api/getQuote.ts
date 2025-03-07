import { TokenAddress } from "@/lib/shared/contracts/tokens";

import apiClient from "../../apiClient";

export const getQuote = async (
  srcToken: TokenAddress,
  dstToken: TokenAddress,
  amount: number,
  includeGas = true
): Promise<{ dstAmount: string }> => {
  const response = await apiClient.get<{ data: { dstAmount: string } }>(
    `/api/swap/quote?srcToken=${srcToken}&dstToken=${dstToken}&amount=${amount}&includeGas=${includeGas}`
  );

  return response.data;
};

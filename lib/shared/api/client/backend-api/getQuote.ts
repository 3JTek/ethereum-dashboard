import { formatUnits, parseUnits } from "viem";

import { TokenInfo } from "@/lib/shared/contracts/tokens";

import apiClient from "../../apiClient";

export const getQuote = async (
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amount: number,
  includeGas = true
): Promise<{ estimatedAmount: string }> => {
  const amountInBaseUnits = parseUnits(amount.toString(), fromToken.decimals).toString();

  const response = await apiClient.get<{ data: { dstAmount: string } }>(
    `/api/swap/quote?srcToken=${fromToken.address}&dstToken=${toToken.address}&amount=${amountInBaseUnits}&includeGas=${includeGas}`
  );

  const estimatedAmount = formatUnits(BigInt(response.data.dstAmount), toToken.decimals);

  return { estimatedAmount };
};

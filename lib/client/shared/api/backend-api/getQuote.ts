import { formatUnits, parseUnits } from "viem";

import { TokenInfo } from "@/lib/common/contracts/tokens";

import clientAgent from "../clientAgent";

export const getQuote = async (
  fromToken: TokenInfo,
  toToken: TokenInfo,
  amount: number,
  includeGas = true
): Promise<{ estimatedAmount: string }> => {
  const amountInBaseUnits = parseUnits(amount.toString(), fromToken.decimals).toString();

  const response = await clientAgent.get<{ data: { dstAmount: string } }>(
    `/api/swap/quote?srcToken=${fromToken.address}&dstToken=${toToken.address}&amount=${amountInBaseUnits}&includeGas=${includeGas}`
  );

  const estimatedAmount = formatUnits(BigInt(response.data.dstAmount), toToken.decimals);

  return { estimatedAmount };
};

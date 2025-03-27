import { ONE_INCH_API_KEY, ONE_INCH_BASE_URL } from "@/lib/common/config/environment";

import backendAgent from "../backendAgent";
import { OneInchProtocol, OneInchTokenInfo } from "./types";

type OneInchGetQuoteQueryParams = {
  srcToken: string;
  dstToken: string;
  amount: number;
  wallet: string;
};

export interface OneInchGetSwapDataResponse {
  srcToken: OneInchTokenInfo;
  dstToken: OneInchTokenInfo;
  dstAmount: string;
  protocols: OneInchProtocol;
  tx: TransactionData;
}

type TransactionData = {
  from: string;
  to: string;
  data: string;
  value: string;
  gasPrice: string;
  gas: number;
};

export const getSwapData = async (incomingParams: OneInchGetQuoteQueryParams): Promise<OneInchGetSwapDataResponse> => {
  console.log("Calling Get Swap Data1Inch API", JSON.stringify(incomingParams));

  const chainId = 1;

  const params = new URLSearchParams({
    src: incomingParams.srcToken,
    dst: incomingParams.dstToken,
    amount: String(incomingParams.amount),
    from: incomingParams.wallet,
    origin: incomingParams.wallet,
    slippage: "1",
  });

  const data = await backendAgent.get<OneInchGetSwapDataResponse>(`${ONE_INCH_BASE_URL}/swap/v6.0/${chainId}/swap?${params}`, {
    headers: { Authorization: `Bearer ${ONE_INCH_API_KEY}` },
  });

  console.log("data", data);

  return data;
};

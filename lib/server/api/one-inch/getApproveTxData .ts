import { ONE_INCH_API_KEY, ONE_INCH_BASE_URL } from "@/lib/common/config/environment";
import { TokenAddress } from "@/lib/common/contracts/tokens";

import backendAgent from "../../utils/httpAgent";
import { OneInchProtocol, OneInchTokenInfo } from "./types";

type Params = {
  tokenAddress: TokenAddress;
  amount: string;
};

type Response = {
  srcToken: OneInchTokenInfo;
  dstToken: OneInchTokenInfo;
  dstAmount: string;
  protocols: OneInchProtocol;
  tx: TransactionData;
};

type TransactionData = {
  from: string;
  to: string;
  data: string;
  value: string;
  gasPrice: string;
  gas: number;
};

export const getApproveTxData = async (incomingParams: Params): Promise<Response> => {
  const chainId = 1;

  const params = new URLSearchParams({
    tokenAddress: incomingParams.tokenAddress,
    amount: String(incomingParams.amount),
  });

  const data = await backendAgent.get<Response>(`${ONE_INCH_BASE_URL}/swap/v6.0/${chainId}/approve/transaction?${params}`, {
    headers: { Authorization: `Bearer ${ONE_INCH_API_KEY}` },
  });

  return data;
};

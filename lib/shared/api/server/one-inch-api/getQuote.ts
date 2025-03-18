import { ONE_INCH_API_KEY, ONE_INCH_BASE_URL } from "../../../config/environment";
import apiClient from "../../apiClient";

export interface OneInchGetQuoteResponse {
  dstAmount: string;
}

export const getQuote = async (srcToken: string, dstToken: string, amount: number, includeGas = true): Promise<OneInchGetQuoteResponse> => {
  console.log("Calling 1Inch API", srcToken, dstToken, amount);

  const chainId = 1;

  const params = new URLSearchParams({
    src: srcToken,
    dst: dstToken,
    amount: String(amount),
    includeGas: String(includeGas),
  });

  const data = await apiClient.get<OneInchGetQuoteResponse>(`${ONE_INCH_BASE_URL}/swap/v6.0/${chainId}/quote?${params}`, {
    headers: { Authorization: `Bearer ${ONE_INCH_API_KEY}` },
  });

  console.log("data", data);

  return data;
};

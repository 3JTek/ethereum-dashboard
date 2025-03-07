import { COIN_GECKO_BASE_URL } from "@/lib/shared/config/environment";

import apiClient from "../../apiClient";

interface TokenPriceResponse {
  [tokenName: string]: {
    [currency: string]: number;
  };
}

export const getTokenPrice = async (tokenName: string, currency: string = "usd"): Promise<number> => {
  const data = await apiClient.get<TokenPriceResponse>(`${COIN_GECKO_BASE_URL}/price?ids=${tokenName}&vs_currencies=${currency}`);

  return data[tokenName][currency];
};

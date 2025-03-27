import { COIN_GECKO_BASE_URL } from "@/lib/common/config/environment";

import clientAgent from "../clientAgent";

interface TokenPriceResponse {
  [tokenName: string]: {
    [currency: string]: number;
  };
}

export const getTokenPrice = async (tokenName: string, currency: string = "usd"): Promise<TokenPriceResponse> => {
  return clientAgent.get<TokenPriceResponse>(`${COIN_GECKO_BASE_URL}/price?ids=${tokenName}&vs_currencies=${currency}`);
};

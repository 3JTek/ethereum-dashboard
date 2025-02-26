import apiClient from "./serverApiClient";

const baseUrl = "https://api.coingecko.com/api/v3/simple";

interface TokenPriceResponse {
  [tokenName: string]: {
    [currency: string]: number;
  };
}

const getTokenPrice = async (tokenName: string, currency: string = "usd"): Promise<number> => {
  const data = await apiClient.get<TokenPriceResponse>(`${baseUrl}/price?ids=${tokenName}&vs_currencies=${currency}`);

  return data[tokenName][currency];
};

const coinGeckoApi = { getTokenPrice };

export default coinGeckoApi;

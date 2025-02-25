const baseUrl = "https://api.coingecko.com/api/v3/simple";

interface TokenPriceResponse {
  [tokenName: string]: {
    [currency: string]: number;
  };
}

const getTokenPrice = async (tokenName: string, currency: string = "usd"): Promise<number> => {
  const response = await fetch(`${baseUrl}/price?ids=${tokenName}&vs_currencies=${currency}`);
  const data: TokenPriceResponse = await response.json();

  return data[tokenName][currency];
};

const coinGeckoApi = { getTokenPrice };

export default coinGeckoApi;

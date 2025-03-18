export type TokenAddress = `0x${string}`;

enum TokenName {
  ETHER = "ether",
  USDC = "usdc",
  POLYGON = "polygon",
  IMMUTABLE = "immutable",
  USDT = "usdt",
  FIT = "fit",
  WRAPPED_BITCOIN = "wrappedBitcoin",
  SHIBA = "shiba",
  UNISWAP = "uniswap",
  CHAINLINK = "chainlink",
}

export enum TokenSymbol {
  ETHER = "ETH",
  USDC = "USDC",
  POLYGON = "MATIC",
  IMMUTABLE = "IMX",
  USDT = "USDT",
  FIT = "FIT",
  WBTC = "WBTC",
  SHIB = "SHIB",
  UNISWAP = "UNI",
  CHAINLINK = "LINK",
}

export type TokenInfo = {
  symbol: TokenSymbol;
  address: TokenAddress;
  decimals: number;
};

export const tokens = {
  ether: { symbol: TokenSymbol.ETHER, address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", decimals: 18 },
  fit: { symbol: TokenSymbol.FIT, address: "0x9B01637302B6Adfc2C82678e2A8D680CFF6337B7", decimals: 18 },
  immutable: { symbol: TokenSymbol.IMMUTABLE, address: "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF", decimals: 18 },
  polygon: { symbol: TokenSymbol.POLYGON, address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", decimals: 18 },
  usdc: { symbol: TokenSymbol.USDC, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6 },
  usdt: { symbol: TokenSymbol.USDT, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
  wrappedBitcoin: { symbol: TokenSymbol.WBTC, address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8 },
  shiba: { symbol: TokenSymbol.SHIB, address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", decimals: 18 },
  uniswap: { symbol: TokenSymbol.UNISWAP, address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", decimals: 18 },
  chainlink: { symbol: TokenSymbol.CHAINLINK, address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", decimals: 18 },
} as Record<TokenName, TokenInfo>;

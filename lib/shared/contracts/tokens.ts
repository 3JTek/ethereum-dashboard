export type TokenAddress = `0x${string}`;

enum TokenName {
  ETHER = "ether",
  USDC = "usdc",
  POLYGON = "polygon",
  IMMUTABLE = "immutable",
  USDT = "usdt",
  FIT = "fit",
}

export enum TokenSymbol {
  ETHER = "ETH",
  USDC = "USDC",
  POLYGON = "MATIC",
  IMMUTABLE = "IMX",
  USDT = "USDT",
  FIT = "FIT",
}

export type TokenInfo = {
  symbol: TokenSymbol;
  address: TokenAddress;
};

export const tokens = {
  ether: { symbol: TokenSymbol.ETHER, address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  fit: { symbol: TokenSymbol.FIT, address: "0x9B01637302B6Adfc2C82678e2A8D680CFF6337B7" },
  immutable: { symbol: TokenSymbol.IMMUTABLE, address: "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF" },
  polygon: { symbol: TokenSymbol.POLYGON, address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0" },
  usdc: { symbol: TokenSymbol.USDC, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  usdt: { symbol: TokenSymbol.USDT, address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
} as Record<TokenName, TokenInfo>;

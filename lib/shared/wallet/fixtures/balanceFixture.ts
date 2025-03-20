import { tokens, TokenSymbol } from "../../contracts/tokens";

const balanceFixture = (value?: bigint, symbol?: TokenSymbol) => {
  let decimals;

  if (symbol) {
    const token = Object.entries(tokens).find(([, token]) => token.symbol === symbol);
    decimals = token ? token[1].decimals : undefined;
  }

  let formatted;

  if (value && decimals) {
    formatted = Number(value / BigInt(10) ** BigInt(decimals)).toFixed(2);
  }

  return {
    data: {
      value: value || BigInt("10000000000000000"),
      decimals: decimals || 18,
      formatted: formatted || "0.01",
      symbol: symbol || "ETH",
    },
  };
};

export default balanceFixture;

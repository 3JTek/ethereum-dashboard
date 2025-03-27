export type OneInchTokenInfo = {
  TokenInfo: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    logoURI: string;
    domainVersion: string;
    eip2612: boolean;
    isFoT: boolean;
    tags: {
      items: string[];
    };
  };
};

export type OneInchProtocol = Record<string, string>;

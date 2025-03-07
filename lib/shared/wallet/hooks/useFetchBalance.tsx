import { useAccount, useBalance } from "wagmi";

import { TokenInfo, TokenSymbol } from "../../contracts/tokens";

const staleTime = 10 * 60 * 1000; //10 minutes before data considered stale

const useFetchBalance = (token: TokenInfo) => {
  const { address } = useAccount();

  const shouldFetch = !!address && !!token;

  const tokenAddress = token && token.symbol !== TokenSymbol.ETHER ? token.address : undefined;

  const { data, isPending, error } = useBalance({
    address: address,
    token: tokenAddress,
    query: { enabled: shouldFetch, staleTime },
  });

  return { data, isPending, error };
};

export default useFetchBalance;

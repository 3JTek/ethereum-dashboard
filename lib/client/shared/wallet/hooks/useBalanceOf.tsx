import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

import { TokenInfo, TokenSymbol } from "@/lib/common/contracts/tokens";

const staleTime = 10 * 60 * 1000; //10 minutes before data considered stale

const useBalanceOf = (token?: TokenInfo) => {
  const { address } = useAccount();

  const shouldFetch = !!address && !!token;

  const tokenAddress = token && token.symbol !== TokenSymbol.ETHER ? token.address : undefined;

  const { data, isPending, error } = useBalance({
    address: address,
    token: tokenAddress,
    query: { enabled: shouldFetch, staleTime },
  });

  const balance = data ? formatUnits(data.value, data.decimals) : undefined;

  return { balance, data, isPending, error };
};

export default useBalanceOf;

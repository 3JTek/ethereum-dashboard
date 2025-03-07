import React from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

import { TokenInfo, TokenSymbol } from "../../contracts/tokens";
import { Skeleton } from "../shadcn-ui/skeleton";

type Props = {
  token: TokenInfo;
};

const TokenBalance = ({ token }: Props) => {
  const { address } = useAccount();

  const { data, isPending, error } = useBalance({
    address: address,
    token: token.symbol !== TokenSymbol.ETHER ? token.address : undefined, //Ether is native token, does not have an address
    query: { enabled: !!address, staleTime: 10 * 60 * 1000 },
  });

  if (!address) {
    return null;
  }

  if (isPending) {
    return <Skeleton data-testid="balance-value-skeleton" className="h-full w-[25px]"></Skeleton>;
  }

  if (error) {
    return <p className="text-red-500 text-sm font-normal leading-normal">Error</p>;
  }

  if (data) {
    return <p className="text-sm font-normal leading -normal">{data ? formatUnits(data.value, data.decimals) : ""}</p>;
  }
};

export default TokenBalance;

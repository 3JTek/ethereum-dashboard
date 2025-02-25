"use client";

import { Skeleton } from "@shared/components/shadcn-ui/skeleton";
import { TokenInfo, TokenSymbol } from "@shared/contracts/tokenAddresses";
import { formatUnits } from "viem";
import { useAccount, useBalance } from "wagmi";

const BalanceItem = ({ token }: { token: TokenInfo }) => {
  const { address } = useAccount();

  const { data, isPending, error } = useBalance({
    address: address,
    token: token.symbol !== TokenSymbol.ETHER ? token.address : undefined, //Ether is native token, does not have an address
    query: { enabled: !!address },
  });

  const getBalanceResult = () => {
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

  return (
    <div className="flex flex-col gap-1 border-t border-solid border-t-[#325567] py-4 pr-2">
      <p className="text-[#92b7c9] text-sm font-normal leading-normal">{token.symbol}</p>
      <div data-testid="balance-value" className="h-4 flex items-center">
        {getBalanceResult()}
      </div>
    </div>
  );
};

export default BalanceItem;

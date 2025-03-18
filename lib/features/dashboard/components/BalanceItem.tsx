"use client";

import { useAccount } from "wagmi";

import TokenBalance from "@/lib/shared/components/custom/TokenBalance";
import { TokenInfo } from "@/lib/shared/contracts/tokens";

const BalanceItem = ({ token }: { token: TokenInfo }) => {
  const { address } = useAccount();

  return (
    <div className="flex flex-col gap-1 border-t border-solid border-t-[#325567] py-4 pr-2">
      <p className="text-[#92b7c9] text-sm font-normal leading-normal">{token.symbol}</p>
      <div data-testid="balance-value" className="h-4 flex items-center">
        {address && <TokenBalance token={token} />}
      </div>
    </div>
  );
};

export default BalanceItem;

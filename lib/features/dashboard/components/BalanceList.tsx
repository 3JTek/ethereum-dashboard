"use client";

import { tokens } from "@/lib/shared/contracts/tokens";

import BalanceItem from "./BalanceItem";

const Balance = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em]">Your Balance</h2>
      </div>
      <div className="grid grid-cols-2">
        <BalanceItem token={tokens.ether} />
        <BalanceItem token={tokens.immutable} />
        <BalanceItem token={tokens.usdc} />
        <BalanceItem token={tokens.polygon} />
        <BalanceItem token={tokens.fit} />
        <BalanceItem token={tokens.usdt} />
      </div>
    </div>
  );
};

export default Balance;

"use client";

import Header from "@/lib/shared/components/custom/Header";
import tokensEnabled from "@/lib/shared/config/tokensEnabled";

import BalanceItem from "./BalanceItem";

const Balance = () => {
  return (
    <div>
      <div className="mb-4">
        <Header type="h2">Your Balance</Header>
      </div>
      <div className="grid grid-cols-2">
        {tokensEnabled.map((token) => (
          <BalanceItem key={token.symbol} token={token} />
        ))}
      </div>
    </div>
  );
};

export default Balance;

"use client";

import React, { useMemo } from "react";

import Header from "@/lib/shared/components/custom/Header";
import TokenBalance from "@/lib/shared/components/custom/TokenBalance";
import { Input } from "@/lib/shared/components/shadcn-ui/input";
import { TokenInfo } from "@/lib/shared/contracts/tokens";

type Props = {
  fromToken: TokenInfo | undefined;
  toToken: TokenInfo | undefined;
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
};

const AmountSelection = ({ fromToken, toToken, amount, setAmount }: Props) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setAmount(undefined);
    } else {
      setAmount(parseFloat(newValue));
    }
  };

  const isDisabled = useMemo(() => !fromToken || !toToken, [fromToken, toToken]);

  const inputAmount = amount ?? "";

  return (
    <div>
      <div className="mb-2">
        <Header type="h3">Amount</Header>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-1/2">
          <Input disabled={isDisabled} type="number" placeholder="0" onChange={handleAmountChange} value={inputAmount} />
        </div>
        <div>
          {fromToken && (
            <div className="flex items-center gap-2">
              <p>Balance:</p>
              <TokenBalance token={fromToken} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmountSelection;

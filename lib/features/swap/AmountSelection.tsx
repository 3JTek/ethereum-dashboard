"use client";

import { RotateCw } from "lucide-react";
import React, { useMemo } from "react";

import Header from "@/lib/shared/components/custom/Header";
import TokenBalance from "@/lib/shared/components/custom/TokenBalance";
import { Button } from "@/lib/shared/components/shadcn-ui/button";
import { Input } from "@/lib/shared/components/shadcn-ui/input";
import { TokenInfo } from "@/lib/shared/contracts/tokens";
import useBalanceOf from "@/lib/shared/wallet/hooks/useBalanceOf";

type Props = {
  fromToken: TokenInfo | undefined;
  toToken: TokenInfo | undefined;
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
};

const AmountSelection = ({ fromToken, toToken, amount, setAmount }: Props) => {
  const { balance } = useBalanceOf(fromToken);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setAmount(undefined);
    } else {
      setAmount(parseFloat(newValue));
    }
  };

  const handleClickMaxAmount = () => {
    if (!balance) return;

    setAmount(parseFloat(balance));
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
              <Button disabled={isDisabled} variant="outline" onClick={handleClickMaxAmount}>
                <RotateCw></RotateCw>
              </Button>
              <div className="text-sm">
                <p>Use max amount</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <p>Balance:</p>
                  <TokenBalance token={fromToken} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmountSelection;

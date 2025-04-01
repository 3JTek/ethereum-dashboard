"use client";

import { RotateCw } from "lucide-react";
import React, { useMemo } from "react";

import Header from "@/lib/client/shared/components/custom/Header";
import TokenBalance from "@/lib/client/shared/components/custom/TokenBalance";
import { Button } from "@/lib/client/shared/components/shadcn-ui/button";
import { Input } from "@/lib/client/shared/components/shadcn-ui/input";
import useBalanceOf from "@/lib/client/shared/wallet/hooks/useBalanceOf";
import { TokenInfo } from "@/lib/common/contracts/tokens";

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

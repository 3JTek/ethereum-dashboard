"use client";

import { RotateCw } from "lucide-react";
import React from "react";

import Header from "@/lib/client/shared/components/custom/Header";
import TokenBalance from "@/lib/client/shared/components/custom/TokenBalance";
import { Button } from "@/lib/client/shared/components/shadcn-ui/button";
import { Input } from "@/lib/client/shared/components/shadcn-ui/input";
import { roundTokenBalance } from "@/lib/client/shared/utils/formatTokenValue";
import useBalanceOf from "@/lib/client/shared/wallet/hooks/useBalanceOf";

import { useFormContext } from "../hooks/useFormContext";
import { ActionType } from "../reducer/formReducer";

const AmountSelection = () => {
  const { state, dispatch } = useFormContext();
  const { balance } = useBalanceOf(state.fromToken);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    let payload: number | undefined;

    if (newValue === "") {
      payload = undefined;
    } else {
      payload = parseFloat(newValue);
    }

    dispatch({ type: ActionType.SET_AMOUNT, payload });
  };

  const handleClickMaxAmount = () => {
    if (!balance) return;

    dispatch({ type: ActionType.SET_AMOUNT, payload: parseFloat(balance) });
  };

  const isDisabled = !state.fromToken || !state.toToken;

  const inputAmount = state.amount ? roundTokenBalance(state.amount) : "";

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
          {state.fromToken && (
            <div className="flex items-center gap-2">
              <Button disabled={isDisabled} variant="outline" onClick={handleClickMaxAmount}>
                <RotateCw></RotateCw>
              </Button>
              <div className="text-sm">
                <p>Use max amount</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <p>Balance:</p>
                  <TokenBalance token={state.fromToken} />
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

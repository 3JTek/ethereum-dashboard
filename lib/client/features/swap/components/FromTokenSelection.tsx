"use client";
import Header from "@lib/client/shared/components/custom/Header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@lib/client/shared/components/shadcn-ui/select";

import tokensEnabled from "@/lib/common/config/tokensEnabled";
import { tokens } from "@/lib/common/contracts/tokens";

import { useFormContext } from "../hooks/useFormContext";
import { ActionType } from "../reducer/formReducer";

const FromTokenSelection = () => {
  const { state, dispatch } = useFormContext();

  const handleTokenChange = (value: string) => {
    const token = Object.values(tokens).find((token) => token.symbol === value);

    dispatch({ type: ActionType.SET_FROM_TOKEN, payload: token });
  };

  return (
    <div className="flex flex-col gap-6">
      <Header type="h3">From</Header>

      <Select value={state.fromToken?.symbol} onValueChange={handleTokenChange}>
        <SelectTrigger aria-label="from-token-select">
          <SelectValue placeholder="Select a token to sell" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tokens</SelectLabel>
            {tokensEnabled.map((token) => (
              <SelectItem key={token.symbol} value={token.symbol}>
                {token.symbol}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FromTokenSelection;

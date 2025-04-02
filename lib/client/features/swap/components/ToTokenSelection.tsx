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

import { useFormContext } from "../hooks/useFormContext";
import { ActionType } from "../reducer/formReducer";

const DestinationTokenSelection = () => {
  const { state, dispatch } = useFormContext();

  const toTokenList = tokensEnabled.filter((token) => token.symbol !== state.fromToken?.symbol);

  const handleTokenChange = (value: string) => {
    const token = Object.values(toTokenList).find((token) => token.symbol === value);

    dispatch({ type: ActionType.SET_TO_TOKEN, payload: token });
  };

  return (
    <div className="flex flex-col gap-6">
      <Header type="h3">To</Header>

      <Select disabled={!state.fromToken} value={state.toToken?.symbol} onValueChange={handleTokenChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a token to buy" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tokens</SelectLabel>
            {toTokenList.map((token) => (
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

export default DestinationTokenSelection;

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
import { TokenInfo } from "@/lib/common/contracts/tokens";

type Props = {
  fromToken: TokenInfo | undefined;
  toToken: TokenInfo | undefined;
  setToToken: (token: TokenInfo | undefined) => void;
};

const DestinationTokenSelection = ({ fromToken, toToken, setToToken }: Props) => {
  const toTokenList = tokensEnabled.filter((token) => token.symbol !== fromToken?.symbol);

  const handleTokenChange = (value: string) => {
    const token = Object.values(toTokenList).find((token) => token.symbol === value);

    setToToken(token);
  };

  return (
    <div className="flex flex-col gap-6">
      <Header type="h3">To</Header>

      <Select disabled={!fromToken} value={toToken?.symbol} onValueChange={handleTokenChange}>
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

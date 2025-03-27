import useBalanceOf from "@lib/client/shared/wallet/hooks/useBalanceOf";

import formatTokenValue from "@/lib/client/shared/utils/formatTokenValue";
import { TokenInfo } from "@/lib/common/contracts/tokens";

import { Skeleton } from "../shadcn-ui/skeleton";

type Props = {
  token: TokenInfo;
};

const TokenBalance = ({ token }: Props) => {
  const { balance, isPending, error } = useBalanceOf(token);

  if (isPending) {
    return <Skeleton data-testid="balance-value-skeleton" className="h-full w-[25px]"></Skeleton>;
  }

  if (error) {
    return <p className="text-red-500 text-sm font-normal leading-normal">Error</p>;
  }

  if (balance) {
    const balanceToDisplay = formatTokenValue(Number(balance));

    return <p className="text-sm font-normal leading -normal">{balanceToDisplay}</p>;
  }
};

export default TokenBalance;

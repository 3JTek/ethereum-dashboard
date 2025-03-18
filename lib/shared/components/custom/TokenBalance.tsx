import { TokenInfo } from "../../contracts/tokens";
import useBalanceOf from "../../wallet/hooks/useBalanceOf";
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
    return <p className="text-sm font-normal leading -normal">{balance}</p>;
  }
};

export default TokenBalance;

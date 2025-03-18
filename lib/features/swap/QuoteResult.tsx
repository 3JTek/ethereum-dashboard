import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

import backendApi from "@/lib/shared/api/client/backend-api";
import Header from "@/lib/shared/components/custom/Header";
import { Skeleton } from "@/lib/shared/components/shadcn-ui/skeleton";
import { TokenInfo } from "@/lib/shared/contracts/tokens";

type Props = {
  fromToken: TokenInfo | undefined;
  toToken: TokenInfo | undefined;
  amount: number | undefined;
};

const QuoteResult = ({ fromToken, toToken, amount }: Props) => {
  const debouncedAmount = useDebounce(amount, 1000);

  const query = useQuery({
    queryKey: ["quote", { fromToken, toToken, debouncedAmount }],
    queryFn: () => backendApi.getQuote(fromToken!, toToken!, debouncedAmount!),
    enabled: () => !!fromToken && !!toToken && !!debouncedAmount,
  });

  const isLoadingSkeletonShown = debouncedAmount !== amount || query.isLoading;

  return (
    <div>
      <div className="mb-2">
        <Header type="h3">Estimated amount</Header>
      </div>
      {isLoadingSkeletonShown ? <Skeleton className="h-full w-[25px]" /> : <p>{query.data?.estimatedAmount || ""}</p>}
    </div>
  );
};

export default QuoteResult;

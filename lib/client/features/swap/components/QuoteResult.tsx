import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect } from "react";

import backendApi from "@/lib/client/shared/api/backend-api";
import Header from "@/lib/client/shared/components/custom/Header";
import { Skeleton } from "@/lib/client/shared/components/shadcn-ui/skeleton";
import formatTokenValue from "@/lib/client/shared/utils/formatTokenValue";
import { TokenInfo } from "@/lib/common/contracts/tokens";

type Props = {
  fromToken: TokenInfo | undefined;
  toToken: TokenInfo | undefined;
  amount: number | undefined;
  quote: number | undefined;
  setQuote: (quote: number) => void;
};

const QuoteResult = ({ fromToken, toToken, amount, quote, setQuote }: Props) => {
  const debouncedAmount = useDebounce(amount, 1000);

  const query = useQuery({
    queryKey: ["quote", { fromToken, toToken, debouncedAmount }],
    queryFn: () => backendApi.getQuote(fromToken!, toToken!, debouncedAmount!),
    enabled: () => !!fromToken && !!toToken && !!debouncedAmount && !!amount,
  });

  useEffect(
    function updateQuoteValue() {
      if (isDebounceComplete && query.isSuccess) {
        setQuote(Number(query.data.estimatedAmount));
      }
    },
    [query]
  );

  const isDebounceComplete = debouncedAmount === amount;

  const isLoading = amount && (!isDebounceComplete || query.isLoading);

  const result = quote ? `${formatTokenValue(quote)} ${toToken?.symbol}` : "";

  return (
    <div>
      <div className="mb-2">
        <Header type="h3">You will receive</Header>
      </div>
      <div className="h-6">{isLoading ? <Skeleton className="h-full w-[25px]" /> : <p>{result}</p>}</div>
    </div>
  );
};

export default QuoteResult;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [fetchQuoteTimeout, setFetchQuoteTimeout] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

  const query = useQuery({
    queryKey: ["quote", fromToken, toToken, amount],
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    queryFn: () => backendApi.getQuote(fromToken?.address!, toToken?.address!, amount!),
    enabled: () => !!fromToken && !!toToken && !!amount && !fetchQuoteTimeout,
  });

  useEffect(
    function debounceFetchQuote() {
      clearTimeout(fetchQuoteTimeout);

      if (!amount) {
        setFetchQuoteTimeout(undefined);
      } else {
        const timeout = setTimeout(() => setFetchQuoteTimeout(undefined), 500);

        setFetchQuoteTimeout(timeout);
      }

      return () => {
        clearTimeout(fetchQuoteTimeout);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [amount]
  );

  console.log(query, fetchQuoteTimeout);

  return (
    <div>
      <div className="mb-2">
        <Header type="h3">Estimated amount</Header>
      </div>
      {fetchQuoteTimeout || query.isLoading ? <Skeleton className="h-full w-[25px]" /> : <p>{query.data?.dstAmount || ""}</p>}
    </div>
  );
};

export default QuoteResult;

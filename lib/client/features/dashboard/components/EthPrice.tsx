"use client";

import coinGeckoApi from "@lib/client/shared/api/coin-gecko-api";
import { useQuery } from "@tanstack/react-query";

const EthereumPrice = () => {
  const query = useQuery({ queryKey: ["getTokenPrice", "ethereum"], queryFn: () => coinGeckoApi.getTokenPrice("ethereum") });

  const ethereumPrice = query.data?.ethereum.usd;

  return (
    <div>
      <div className="mb-4">
        <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em]">Current ETH Price</h2>
      </div>
      <p className=" text-base font-normal leading-normal ">{ethereumPrice ? `$${ethereumPrice}` : "Could not fetch price."}</p>
    </div>
  );
};

export default EthereumPrice;

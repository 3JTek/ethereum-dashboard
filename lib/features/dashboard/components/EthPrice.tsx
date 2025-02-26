"use server";

import coinGeckoApi from "@shared/api/coinGeckoApi";

const EthereumPrice = async () => {
  const ethereumPrice = await coinGeckoApi.getTokenPrice("ethereum");
  console.log("here", ethereumPrice);

  return (
    <div>
      <div className="mb-4">
        <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em]">Current ETH Price</h2>
      </div>
      <p className=" text-base font-normal leading-normal ">${ethereumPrice || "Could not fetch price."}</p>
    </div>
  );
};

export default EthereumPrice;

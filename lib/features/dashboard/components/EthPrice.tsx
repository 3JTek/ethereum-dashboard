"use server";

import coinGeckoApi from "@/lib/shared/api/client/coin-gecko-api";

const EthereumPrice = async () => {
  let ethereumPrice;

  try {
    ethereumPrice = await coinGeckoApi.getTokenPrice("ethereum");
  } catch (error) {
    console.log(error);
  }

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

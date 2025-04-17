"use client";

import React, { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

import wagmiConfig from "../config/wagmiConfig";

const WalletProvider = ({ children }: PropsWithChildren) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};

export default WalletProvider;

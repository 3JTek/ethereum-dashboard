import React from "react";

import Swap from "@/lib/client/features/swap/components/Swap";
import WalletProtectedRoute from "@/lib/client/shared/components/custom/WalletProtectedRoute";

const page = () => {
  return (
    <WalletProtectedRoute>
      <Swap />
    </WalletProtectedRoute>
  );
};

export default page;

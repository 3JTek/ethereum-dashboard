import { Terminal } from "lucide-react";
import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/lib/shared/components/shadcn-ui/alert";

const Mint = () => {
  return (
    <div className="flex-1 items-center flex">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Minting is coming soon...</AlertDescription>
      </Alert>
    </div>
  );
};

export default Mint;

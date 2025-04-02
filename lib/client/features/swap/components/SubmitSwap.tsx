import React from "react";

import { Button } from "@/lib/client/shared/components/shadcn-ui/button";

import { useFormContext } from "../hooks/useFormContext";

const SubmitSwap = () => {
  const { state } = useFormContext();

  const handleSwapClick = () => {
    console.log("Swap clicked");
  };

  return (
    <div>
      <Button disabled={!state.quote} onClick={handleSwapClick}>
        Swap
      </Button>
    </div>
  );
};

export default SubmitSwap;

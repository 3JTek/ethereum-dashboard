import React from "react";

import { Button } from "@/lib/client/shared/components/shadcn-ui/button";

type Props = {
  quote: number | undefined;
};

const SubmitSwap = ({ quote }: Props) => {
  const handleSwapClick = () => {
    console.log("Swap clicked");
  };

  return (
    <div>
      <Button disabled={!quote} onClick={handleSwapClick}>
        Swap
      </Button>
    </div>
  );
};

export default SubmitSwap;

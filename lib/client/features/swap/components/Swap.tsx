"use client";

import { FormProvider } from "../hooks/useFormContext";
import AmountSelection from "./AmountSelection";
import FromTokenSelection from "./FromTokenSelection";
import QuoteResult from "./QuoteResult";
import SubmitSwap from "./SubmitSwap";
import Title from "./Title";
import ToTokenSelection from "./ToTokenSelection";

const Swap = () => {
  return (
    <FormProvider>
      <div className="flex flex-1 gap-10 flex-col w-full md:w-[600px]">
        <Title />
        <FromTokenSelection />
        <ToTokenSelection />
        <AmountSelection />
        <QuoteResult />
        <SubmitSwap />
      </div>
    </FormProvider>
  );
};

export default Swap;

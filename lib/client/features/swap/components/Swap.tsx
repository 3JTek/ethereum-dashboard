"use client";

import { useEffect, useState } from "react";
import { a } from "vitest/dist/chunks/suite.qtkXWc6R.js";

import { TokenInfo } from "@/lib/common/contracts/tokens";

import AmountSelection from "./AmountSelection";
import FromTokenSelection from "./FromTokenSelection";
import QuoteResult from "./QuoteResult";
import SubmitSwap from "./SubmitSwap";
import Title from "./Title";
import ToTokenSelection from "./ToTokenSelection";

const Swap = () => {
  const [fromToken, setFromToken] = useState<TokenInfo | undefined>(undefined);
  const [toToken, setToToken] = useState<TokenInfo | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [quote, setQuote] = useState<number | undefined>(undefined);

  useEffect(
    function resetFormOnTokenChange() {
      setAmount(undefined);
      setQuote(undefined);
    },
    [fromToken, toToken]
  );

  useEffect(
    function resetQuoteOnAmountChange() {
      setQuote(undefined);
    },
    [amount]
  );
  console.log(amount);
  return (
    <div className="flex flex-1 gap-10 flex-col w-full md:w-[600px]">
      <Title />
      <FromTokenSelection token={fromToken} setToken={setFromToken} />
      <ToTokenSelection fromToken={fromToken} toToken={toToken} setToToken={setToToken} />
      <AmountSelection fromToken={fromToken} toToken={toToken} amount={amount} setAmount={setAmount} />
      <QuoteResult fromToken={fromToken} toToken={toToken} amount={amount} quote={quote} setQuote={setQuote} />
      <SubmitSwap quote={quote}></SubmitSwap>
    </div>
  );
};

export default Swap;

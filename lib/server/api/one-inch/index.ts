import { getApproveTxData } from "./getApproveTxData ";
import { getQuote } from "./getQuote";
import { getSwapData } from "./getSwapData";

const oneInchApi = { getQuote, getSwapData, getApproveTxData };

export default oneInchApi;

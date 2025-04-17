import { getApproveTxData } from "./getApproveTxData";
import { getEns } from "./getEns";
import { getQuote } from "./getQuote";
import { getSwapData } from "./getSwapData";

const backendApi = { getQuote, getSwapData, getApproveTxData, getEns };

export default backendApi;

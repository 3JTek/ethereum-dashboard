import { TokenInfo } from "@/lib/common/contracts/tokens";

type State = {
  fromToken: TokenInfo | undefined;
  toToken: TokenInfo | undefined;
  amount: number | undefined;
  quote: number | undefined;
};

export enum ActionType {
  SET_FROM_TOKEN = "SET_FROM_TOKEN",
  SET_TO_TOKEN = "SET_TO_TOKEN",
  SET_AMOUNT = "SET_AMOUNT",
  SET_MAX_AMOUNT = "SET_MAX_AMOUNT",
  SET_QUOTE = "SET_QUOTE",
}

export type Action =
  | { type: ActionType.SET_FROM_TOKEN; payload: TokenInfo | undefined }
  | { type: ActionType.SET_TO_TOKEN; payload: TokenInfo | undefined }
  | { type: ActionType.SET_AMOUNT; payload: number | undefined }
  | { type: ActionType.SET_MAX_AMOUNT; payload: number }
  | { type: ActionType.SET_QUOTE; payload: number | undefined };

export const initialState: State = {
  amount: undefined,
  fromToken: undefined,
  toToken: undefined,
  quote: undefined,
};

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FROM_TOKEN":
      return { ...state, fromToken: action.payload, amount: undefined, quote: undefined };
    case "SET_TO_TOKEN":
      return { ...state, toToken: action.payload, amount: undefined, quote: undefined };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload, quote: undefined };
    case "SET_QUOTE":
      return { ...state, quote: action.payload };
    default:
      return state;
  }
};

export default formReducer;

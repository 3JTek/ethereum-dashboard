import React from "react";
import { useReducer } from "react";

import formReducer, { Action, initialState } from "../reducer/formReducer";

const FormContext = React.createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => React.useContext(FormContext);

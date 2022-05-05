import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const Store = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext();
export default Store;

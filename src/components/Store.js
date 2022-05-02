import React, { createContext, useState } from "react";

const Store = ({ children, initialState }) => {
  const [currency, setCurrency] = useState(initialState);
  return (
    <Context.Provider value={[currency, setCurrency]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext();
export default Store;

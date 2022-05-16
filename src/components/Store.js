import React, { createContext, useReducer, useEffect, useState } from "react";
import Reducer from "./Reducer";
import { GETCURR, GETPRODUCTS } from "./Shared/shared";
import { useQuery } from "@apollo/client";

let initialState = {
  currency: null,
  cart: [],
};

const Store = ({ children }) => {
  const {
    loading: loadingCurr,
    error: errorCurr,
    data: dataCurr,
  } = useQuery(GETCURR);
  const {
    loading: loadingP,
    error: errorP,
    data: dataP,
  } = useQuery(GETPRODUCTS, {
    variables: { CategoryInput: { title: "all" } },
  });
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (dataCurr && dataP) {
      initialState.currency = dataCurr.currencies.find(
        ({ label }) => label === window.localStorage.getItem("curr")
      )
        ? dataCurr.currencies.find(
            ({ label }) => label === window.localStorage.getItem("curr")
          )
        : dataCurr.currencies[0];
      window.localStorage.setItem("curr", initialState.currency.label);
      if (window.localStorage.getItem("cart")) {
        window.localStorage
          .getItem("cart")
          .split(", ")
          .forEach((str) => {
            let flag = false;
            dataP.category.products
              .find(({ id, inStock }) => id === JSON.parse(str).id && inStock)
              .attributes.forEach((attr) => {
                attr.items.forEach(({ value }) => {
                  flag = value === JSON.parse(str).attrs[attr.id] ? true : flag;
                });
              });
            if (flag) initialState.cart.push(JSON.parse(str));
          });
        window.localStorage.setItem(
          "cart",
          initialState.cart.map((item) => JSON.stringify(item)).join(", ")
        );
      }
      setRender(true);
    }
  }, [loadingCurr || loadingP]);
  if (loadingCurr || loadingP)
    return (
      <div className="page-wrapper">
        <p>Loading...</p>
      </div>
    );
  if (errorCurr || loadingP)
    return (
      <div className="page-wrapper">
        <p>Error :(</p>
      </div>
    );

  return render ? (
    <ContextProvider initialState={initialState}>{children}</ContextProvider>
  ) : (
    <></>
  );
};

const ContextProvider = ({ children, initialState }) => {
  console.log(initialState.currency);
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {console.log(state)}
      {children}
    </Context.Provider>
  );
};

export const Context = createContext();
export default Store;

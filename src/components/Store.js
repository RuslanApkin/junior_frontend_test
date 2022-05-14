import React, { createContext, useReducer, useEffect } from "react";
import Reducer from "./Reducer";
import { GETCURR, GETPRODUCTS } from "./Shared/shared";
import { useQuery } from "@apollo/client";

const initialState = {
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
  useEffect(() => {
    if (dataCurr && dataP) {
      initialState.currency = dataCurr.currencies.find(
        ({ label }) => label === window.localStorage.getItem("curr")
      )
        ? dataCurr.currencies.find(
            ({ label }) => label === window.localStorage.getItem("curr")
          )
        : dataCurr.currencies[0];
      if (window.localStorage.getItem("cart")) {
        window.localStorage
          .getItem("cart")
          .split(", ")
          .forEach((str) => {
            let flag = false;
            dataP.category.products
              .find(({ id }) => id === JSON.parse(str).id)
              .attributes.map((attr) =>
                attr.items.map(
                  ({ value }) =>
                    (flag =
                      value === JSON.parse(str).attrs[attr.id] ? true : flag)
                )
              );
            if (flag) initialState.cart.push(JSON.parse(str));
          });
      }
    }
  }, [loadingCurr, loadingP]);
  if (loadingP && loadingCurr) return <p>Loading...</p>;
  if (errorP && errorCurr) return <p>Error...</p>;
  return (
    <ContextProvider
      initialState={initialState}
      dataP={dataP}
      dataCurr={dataCurr}
    >
      {children}
    </ContextProvider>
  );
};

const ContextProvider = ({ children, initialState }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext();
export default Store;

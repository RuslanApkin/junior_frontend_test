import React, { useContext, useState } from "react";
import "./header.css";
import logo from "../../img/a-logo.svg";
import CartIcon from "../Shared/CartIcon";
import { useQuery } from "@apollo/client";
import { Context } from "../Store";
import { GETCURR, GETPRODUCT } from "../Shared/shared";
import { Link } from "react-router-dom";

export const Icon = (props) => {
  return (
    <>
      <img src={logo} alt="icon" className={props.className}></img>
    </>
  );
};

export const Currency = () => {
  const [active, setActive] = useState(false);
  const { loading, error, data } = useQuery(GETCURR);
  const [state, dispatch] = useContext(Context);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div className="currency-wrapper">
      <button className="currency-btn" onClick={() => setActive(!active)}>
        <span>{state.currency.symbol}</span>
        <svg
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 0.5L4 3.5L7 0.5"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {active ? (
        <div>
          <ul className="currency-list">
            {data.currencies.map((curr) => (
              <li
                onClick={() => {
                  dispatch({ type: "SET_CURR", payload: curr });
                  setActive(false);
                }}
              >
                {curr.symbol} {curr.label}
              </li>
            ))}
          </ul>
          <span
            className="currency-cover"
            onClick={() => setActive(false)}
          ></span>
        </div>
      ) : null}
    </div>
  );
};

export const ShoppingCartIcon = ({ orderActive, setOrderActive, state }) => {
  return (
    <>
      <div className="sc-wrapper">
        <button className="sc-btn" onClick={() => setOrderActive(!orderActive)}>
          <CartIcon color="#1D1F22" wh="20px" />
          <span
            className={`sc-notification ${
              state.cart.length === 0 ? "sc-notification--hide" : ""
            }`}
          >
            {state.cart.length}
          </span>
        </button>
      </div>
    </>
  );
};

export const ShoppingCart = ({ orderActive, setOrderActive, state }) => {
  return (
    <>
      {orderActive ? (
        <div className="sc-orderWrapper">
          <span
            className="sc-orderCover"
            onClick={() => setOrderActive(!orderActive)}
          ></span>
          <div className="page-wrapper cs-orderList">
            <div className="sc-order">
              {state.cart.length ? (
                <>
                  <span className="cs-orderQty">
                    My Bag, {state.cart.length} items
                  </span>
                  <ul className="sc-orderList">
                    {state.cart.map((item) => (
                      <SCItem item={item} curr={state.currency} />
                    ))}
                  </ul>
                  <div className="sc-orderBtnWrapper">
                    <Link to="all/cart">View bag</Link>
                    <Link to="all/cart">Check out</Link>
                  </div>
                </>
              ) : (
                <span className="sc-empty">it's still empty ...</span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const SCItem = ({ item, curr }) => {
  const { loading, error, data } = useQuery(GETPRODUCT, {
    variables: { id: item.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <li className="sc-itemWrapper">
      <div className="cs-itemInfo">
        <span className="sc-itemName">{data.product.name}</span>
        <span className="sc-itemPrice">
          {curr.symbol}
          {
            data.product.prices.find(
              ({ currency }) => curr.label === currency.label
            ).amount
          }
        </span>
        <div className="sc-itemAttrs">
          {data.product.attributes.map((attr) => (
            <span
              className={
                attr.type === "swatch" ? "sc-itemAttrColor" : "sc-itemAttr"
              }
              style={{
                backgroundColor:
                  attr.type === "swatch" ? item.attrs[attr.id] : null,
              }}
            >
              {attr.type === "swatch" ? null : item.attrs[attr.id]}
            </span>
          ))}
        </div>
      </div>
      <div className="sc-itemQtyWrapper">
        <button className="sc-itemQtyBtn">+</button>
        <span className="sc-itemQtyValue">{item.qty}</span>
        <button className="sc-itemQtyBtn">-</button>
      </div>
      <div className="sc-itemImgWrapper">
        <img src={data.product.gallery[0]} alt="product img"></img>
      </div>
    </li>
  );
};

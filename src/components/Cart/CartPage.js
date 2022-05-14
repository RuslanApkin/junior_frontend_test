import React, { useContext, useEffect } from "react";
import { Context } from "../Store";
import "./cartpage.css";
import { useQuery } from "@apollo/client";
import { GETPRODUCT } from "../Shared/shared";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {});
  console.log(state);
  return (
    <div className="page-wrapper">
      <h2 className="cart-h2">Cart</h2>
      <ul className="sc-orderList">
        {state.cart.map((item) => (
          <CartItem item={item} curr={state.currency} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
}

const CartItem = ({ item, curr, dispatch }) => {
  const { loading, error, data } = useQuery(GETPRODUCT, {
    variables: { id: item.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <li className="sc-itemWrapper ci-itemWrapper">
      <div className="cs-itemInfo ci-itemInfo">
        <Link to={"/all/" + item.id} className="ci-productLink">
          <h2 className="product-brand ci-itemBrand">{data.product.brand}</h2>
          <h3 className="product-name ci-itemName">{data.product.name}</h3>
        </Link>
        <span className="sc-itemPrice ci-itemPrice">
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
                attr.type === "swatch"
                  ? "attr-item ci-attrItem attr-itemColor"
                  : "attr-item ci-attrItem attr-itemText"
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
        <button
          className="sc-itemQtyBtn ci-itemQtyBtn"
          onClick={() => {
            dispatch({ type: "INC_PRODUCT", payload: item });
          }}
        ></button>
        <span className="ci-itemQtyValue">{item.qty}</span>
        <button
          className="sc-itemQtyBtn ci-itemQtyBtn"
          onClick={() => {
            dispatch({ type: "REMOVE_PRODUCT", payload: item.hash });
          }}
        ></button>
      </div>
      <div className="ci-itemImgWrapper">
        <img src={data.product.gallery[0]} alt="product img"></img>
      </div>
    </li>
  );
};

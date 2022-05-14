import React, { useContext, useState } from "react";
import { CartIcon, AddIcon } from "../Shared/Icons";
import "./productlist.css";
import { Link } from "react-router-dom";
import { Context } from "../Store";

export default function ProductList({ data }) {
  const [state, dispatch] = useContext(Context);
  return (
    <div className="pl-grid">
      {data.map((data) => (
        <PriductTile data={data} state={state} dispatch={dispatch} />
      ))}
    </div>
  );
}

const PriductTile = ({ data, state, dispatch }) => {
  const { name, prices, gallery, inStock, id, attributes } = data;
  const [added, setAdded] = useState("");

  let initialValues;

  if (data) {
    initialValues = {};
    attributes.map((attr) => (initialValues[attr.id] = attr.items[0].value));
  }
  return (
    <div className={`product-tile ${!inStock ? "outOfStock" : ""}`}>
      <Link to={id} className="pt-linkCover"></Link>
      <div className="pt-imgWrapper">
        {!inStock ? <span className="pt-outText">out of stock</span> : null}
        <img src={gallery[0]} alt="" className="pt-img" />
        {inStock ? (
          <span
            className="pt-cart"
            onClick={() => {
              dispatch({
                type: "ADD_PRODUCT",
                payload: { id: id, attr: initialValues },
              });
              setAdded(true);
              setTimeout(() => {
                setAdded(false);
              }, 1500);
            }}
          >
            {added ? (
              <AddIcon color="white" wh="30px" />
            ) : (
              <CartIcon color="white" wh="24px" />
            )}
          </span>
        ) : null}
      </div>
      <h3 className="pt-title">{name}</h3>
      <span className="pt-price">
        {state.currency.symbol}
        {
          prices.find(({ currency }) => state.currency.label === currency.label)
            .amount
        }
      </span>
    </div>
  );
};

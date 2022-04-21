import React from "react";
import CartIcon from "../Shared/CartIcon";
import "./productlist.css";

export default function ProductList({ data }) {
  return (
    <div className="pl-grid">
      {data.map((data) => (
        <PriductTile data={data} />
      ))}
    </div>
  );
}

const PriductTile = ({ data }) => {
  const { title, price, currency, imgUrl, availability } = data;
  return (
    <div className={`product-tile ${availability ? "hoverable" : ""}`}>
      <div className="pt-imgWrapper">
        {!availability ? (
          <span className="pt-outText">out of stock</span>
        ) : null}
        <img src={imgUrl} alt="" className="pt-img" />
        <div className="pt-cart">
          <CartIcon color="white" wh="24px" />
        </div>
      </div>
      <h3 className="pt-title">{title}</h3>
      <span className="pt-price">
        {currency}
        {price}
      </span>
    </div>
  );
};

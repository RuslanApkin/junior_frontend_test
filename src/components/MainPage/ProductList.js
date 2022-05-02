import React, { useContext } from "react";
import CartIcon from "../Shared/CartIcon";
import "./productlist.css";
import { Link } from "react-router-dom";
import { Context } from "../Store";

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
  const { name, prices, gallery, inStock, id } = data;
  const [curr, setCurr] = useContext(Context);
  return (
    <Link to={id} className={`product-tile ${!inStock ? "outOfStock" : ""}`}>
      <div className="pt-imgWrapper">
        {!inStock ? <span className="pt-outText">out of stock</span> : null}
        <img src={gallery[0]} alt="" className="pt-img" />
        {inStock ? (
          <div className="pt-cart">
            <CartIcon color="white" wh="24px" />
          </div>
        ) : null}
      </div>
      <h3 className="pt-title">{name}</h3>
      <span className="pt-price">
        {curr.symbol}
        {prices.find(({ currency }) => curr.label === currency.label).amount}
      </span>
    </Link>
  );
};

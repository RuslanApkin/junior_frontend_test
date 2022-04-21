import React from "react";
import "./mainpage.css";
import ProductList from "./ProductList";
import imgTemp from "../../img/Image.png";

const products = [
  {
    title: "Apollo Running Short",
    price: "50",
    currency: "$",
    imgUrl: imgTemp,
    availability: true,
  },
  {
    title: "Apollo Running Short",
    price: "50",
    currency: "$",
    imgUrl: imgTemp,
    availability: true,
  },
  {
    title: "Out",
    price: "50",
    currency: "$",
    imgUrl: imgTemp,
    availability: false,
  },
  {
    title: "Apollo Running Short",
    price: "50",
    currency: "$",
    imgUrl: imgTemp,
    availability: true,
  },
  {
    title: "Apollo Running Short",
    price: "50",
    currency: "$",
    imgUrl: imgTemp,
    availability: true,
  },
  {
    title: "Apollo Running Short",
    price: "50",
    currency: "$",
    imgUrl: imgTemp,
    availability: true,
  },
];

export default function MainPage() {
  return (
    <div className="page-wrapper">
      <h2 className="mainpage-h2">Category Page</h2>
      <ProductList data={products} />
    </div>
  );
}

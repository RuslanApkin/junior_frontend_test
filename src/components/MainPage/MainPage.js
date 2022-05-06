import React from "react";
import "./mainpage.css";
import ProductList from "./ProductList";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { GETPRODUCTS } from "../Shared/shared";

export default function MainPage() {
  let name = useLocation();
  name = name.pathname.slice(1);
  name = !name ? "all" : name;
  let CategoryInput = { title: name };

  const { loading, error, data } = useQuery(GETPRODUCTS, {
    variables: { CategoryInput },
  });

  if (loading)
    return (
      <div className="page-wrapper">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="page-wrapper">
        <p>Error :(</p>
      </div>
    );

  return (
    <div className="page-wrapper">
      <h2 className="mainpage-h2">{data.category.name}</h2>
      <ProductList data={data.category.products} />
    </div>
  );
}

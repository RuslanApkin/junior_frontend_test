import React, { useEffect } from "react";
import "./mainpage.css";
import ProductList from "./ProductList";
import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

const GETPRODUCTS = gql`
  query getCategory($CategoryInput: CategoryInput) {
    category(input: $CategoryInput) {
      name
      products {
        id
        name
        inStock
        gallery
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export default function MainPage() {
  let name = useLocation();
  name = name.pathname.slice(1);
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

  console.log(data.category.name);

  return (
    <div className="page-wrapper">
      <h2 className="mainpage-h2">{data.category.name}</h2>
      <ProductList data={data.category.products} />
    </div>
  );
}

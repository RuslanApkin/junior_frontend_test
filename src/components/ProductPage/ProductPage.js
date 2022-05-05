import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../Store";
import "./productpage.css";

const GETPRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
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
      brand
    }
  }
`;

export default function ProductPage() {
  let urlId = useLocation();
  urlId = urlId.pathname.split("/")[2];
  const { loading, error, data } = useQuery(GETPRODUCT, {
    variables: { id: urlId },
  });
  const [imageUrl, setImage] = useState();
  const [formValues, setForm] = useState();
  const handleChange = (event) => {
    setImage(event.target.value);
  };
  const [state, dispatch] = useContext(Context);
  const addToCart = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_PRODUCT",
      payload: { id: data.product.id, ...formValues },
    });
  };

  useEffect(() => {
    if (data) {
      const initialValues = {};
      data.product.attributes.map(
        (attr) => (initialValues[attr.id] = attr.items[0])
      );
      setForm(initialValues);
    }
  }, [loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="page-wrapper">
      <div className="product-wrapper">
        <div className="choose-img">
          <label>
            <input
              type="radio"
              name="gallery"
              id={data.product.gallery[0]}
              value={data.product.gallery[0]}
              className="thumbnail-input"
              checked={!imageUrl || imageUrl === data.product.gallery[0]}
              onChange={handleChange}
            ></input>
            <img
              src={data.product.gallery[0]}
              alt="gallery-img"
              className="thumbnail"
            />
          </label>
          {data.product.gallery.slice(1).map((gallery) => (
            <label>
              <input
                type="radio"
                name="gallery"
                id={gallery}
                value={gallery}
                className="thumbnail-input"
                checked={imageUrl === gallery}
                onChange={handleChange}
              ></input>
              <img src={gallery} alt="gallery-img" className="thumbnail" />
            </label>
          ))}
        </div>
        <img
          src={imageUrl ? imageUrl : data.product.gallery[0]}
          alt="gallery-img"
          className="product-img"
        />
        <div className="product-info">
          <h2 className="product-brand">{data.product.brand}</h2>
          <h3 className="product-name">{data.product.name}</h3>
          <form
            id="addForm"
            className="product-addForm"
            onSubmit={(e) => addToCart(e)}
          >
            {data.product.attributes.map((attr) => (
              <div className="product-attribute">
                <span className="product-attrName">{attr.name}</span>
                <div className="attr-items">
                  {attr.items.map((item) => (
                    <>
                      <input
                        type="radio"
                        name={attr.id}
                        id={attr.id + item.id}
                        required
                        className="attr-input"
                        disabled={!data.product.inStock}
                        checked={
                          formValues
                            ? formValues[attr.id].id === item.id
                            : false
                        }
                        onChange={() => {
                          setForm((formValues) => ({
                            ...formValues,
                            [attr.name]: item,
                          }));
                        }}
                      ></input>
                      <label
                        className={
                          attr.type === "swatch"
                            ? "attr-item attr-itemColor"
                            : "attr-item attr-itemText"
                        }
                        for={attr.id + item.id}
                        style={{
                          backgroundColor:
                            attr.type === "swatch" ? item.value : null,
                        }}
                      >
                        {attr.type === "swatch" ? null : <>{item.value}</>}
                        {!data.product.inStock ? (
                          <span className="attr-itemOut"></span>
                        ) : null}
                      </label>
                    </>
                  ))}
                </div>
              </div>
            ))}
            <div className="price-wrapper">
              <span className="product-attrName">Price</span>
              <span className="product-price">
                {state.currency.symbol}
                {
                  data.product.prices.find(
                    ({ currency }) => state.currency.label === currency.label
                  ).amount
                }
              </span>
            </div>
            {data.product.inStock ? (
              <button className="product-btn product-add">Add to Cart</button>
            ) : (
              <div className="product-btn product-out">Out of stock</div>
            )}

            <div
              className="product-desc"
              dangerouslySetInnerHTML={{ __html: data.product.description }}
            ></div>
          </form>
        </div>
      </div>
    </div>
  );
}

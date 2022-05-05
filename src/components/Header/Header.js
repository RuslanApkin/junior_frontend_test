import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import logo from "../../img/a-logo.svg";
import CartIcon from "../Shared/CartIcon";
import { useQuery, gql } from "@apollo/client";
import { Context } from "../Store";

const GETNAVLINKS = gql`
  query getCategories {
    categories {
      name
    }
  }
`;

const GETCURR = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;

const order = ["adf", "a", "so"];

export default function Header() {
  let title = useLocation();
  title = title.pathname.split("/")[1];
  title = !title ? "all" : title;
  const [orderActive, setOrderActive] = useState(false);
  const { loading, error, data } = useQuery(GETNAVLINKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <nav>
            <ul className="header-ul">
              {data.categories.map((cat) => (
                <li
                  className={`header-li ${
                    cat.name === title ? "selected" : ""
                  }`}
                >
                  <Link to={cat.name} className="navlink">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/" className="header-icon">
            <Icon />
          </Link>

          <div className="right-wrapper">
            <Currency />
            <ShoppingCart
              orderActive={orderActive}
              setOrderActive={setOrderActive}
            />
          </div>
        </div>
      </header>
      {orderActive ? (
        <>
          <div className="sc-orderWrapper">
            <span
              className="sc-orderCover"
              onClick={() => setOrderActive(!orderActive)}
            ></span>
            <div className="page-wrapper cs-orderList">
              <div className="sc-order">
                <ul>
                  {order.map((curr) => (
                    <li>{curr}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

const Icon = (props) => {
  return (
    <>
      <img src={logo} alt="icon" className={props.className}></img>
    </>
  );
};

const Currency = () => {
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

const ShoppingCart = ({ orderActive, setOrderActive }) => {
  return (
    <div className="sc-wrapper">
      <button className="sc-btn" onClick={() => setOrderActive(!orderActive)}>
        <CartIcon color="#1D1F22" wh="20px" />
      </button>
    </div>
  );
};

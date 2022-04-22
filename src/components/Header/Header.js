import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../img/a-logo.svg";
import CartIcon from "../Shared/CartIcon";

const navLinks = [
  {
    title: "women",
    url: "/",
  },
  {
    title: "men",
    url: "/",
  },
  {
    title: "kids",
    url: "/",
  },
];

const currList = ["usd", "eur", "rub"];

const order = ["adf", "a", "so"];

export default function Header() {
  const title = "women";
  const [orderActive, setOrderActive] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-wrapper">
          <nav>
            <ul className="header-ul">
              {navLinks.map((link) => (
                <li
                  className={`header-li ${
                    link.title === title ? "selected" : ""
                  }`}
                >
                  <Link to={link.url} className="navlink">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link to="/" className="header-icon">
            <Icon />
          </Link>

          <div className="right-wrapper">
            <Currency curr="$" currlist={currList} />
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

const Currency = ({ curr, currlist }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="currency-wrapper">
      <button className="currency-btn" onClick={() => setActive(!active)}>
        <span>{curr}</span>
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
        <div className="currency-list">
          <ul>
            {currlist.map((curr) => (
              <li>{curr}</li>
            ))}
          </ul>
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

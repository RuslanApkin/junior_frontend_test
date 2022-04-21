import React from "react";
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

export default function Header() {
  const title = "women";
  return (
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
          <Currency curr="$" />
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
}

const Icon = (props) => {
  return (
    <>
      <img src={logo} alt="icon" className={props.className}></img>
    </>
  );
};

const Currency = ({ curr }) => {
  return (
    <div className="currency-wrapper">
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
    </div>
  );
};

const ShoppingCart = () => {
  return (
    <>
      <CartIcon color="#1D1F22" />
    </>
  );
};

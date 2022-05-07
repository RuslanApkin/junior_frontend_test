import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import { useQuery } from "@apollo/client";
import { Context } from "../Store";
import { GETCATEGORIES } from "../Shared/shared";
import { Icon, Currency, ShoppingCart, ShoppingCartIcon } from "./ulils";

export default function Header() {
  let title = useLocation();
  title = title.pathname.split("/")[1];
  title = !title ? "all" : title;
  const [orderActive, setOrderActive] = useState(false);
  const { loading, error, data } = useQuery(GETCATEGORIES);
  const [state, dispatch] = useContext(Context);

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
            <ShoppingCartIcon
              orderActive={orderActive}
              setOrderActive={setOrderActive}
              state={state}
            />
          </div>
        </div>
      </header>
      <ShoppingCart
        orderActive={orderActive}
        setOrderActive={setOrderActive}
        state={state}
      />
    </>
  );
}

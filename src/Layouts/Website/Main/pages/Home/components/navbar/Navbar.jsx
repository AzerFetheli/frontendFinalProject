import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import BaskerCart from "./components/basketCart/BaskerCart";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../../../../../../../context/BasketContext";
import { API } from "../../../../../../../axios";
import { userContext } from "../../../../../../../context/AuthContext";
import { getSiteProducts } from "../../../../../../../Services/Products";

export default function Navbar() {
  const { basket, data, setQuery } = useContext(BasketContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [accordionStates, setAccordionStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const { user } = useContext(userContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleAccordion = (index) => {
    const newAccordionStates = [...accordionStates];
    newAccordionStates[index] = !newAccordionStates[index];
    setAccordionStates(newAccordionStates);
  };

  const navigate = useNavigate();

  const input = useRef(null);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const query = input.current.value;
    navigate(`/shop?query=${query}`);
    setQuery(query);
  };

  return (
    <>
      <nav>
        <div className="navbarContainer">
          <div className="navbarLeft">
            <div className="navbarImg">
              <Link to={"/"}>
                <img
                  src="https://boyka-demo.myshopify.com/cdn/shop/files/logo_300x300.png?v=1613792349"
                  alt=""
                />
              </Link>
            </div>
            <div className="navbarPages">
              <ul>
                <li className="home">
                  Home
                  <div className="homeDropdown">
                    <div>home1</div>
                    <div>home2</div>
                    <div>home3</div>
                    <div>home4</div>
                    <div>home5</div>
                  </div>
                </li>
                <li className="shop">
                  Shop
                  <div className="shopDropdown">
                    <div>SmartPhones</div>
                    <div>Tablets</div>
                    <div>Electronics</div>
                  </div>
                </li>
                <li className="product">
                  Products
                  <div className="productDropdown">
                    <div>Simple Product</div>
                    <div>VariableProducts</div>
                    <div>AfallateProducts </div>
                    <div>SoldoutProduct</div>
                    <div>PreorderProduct</div>
                  </div>
                </li>
                <li className="blog">
                  Blog
                  <div className="blogDropdown">
                    <div>Blog</div>
                    <div>BlogDetails</div>
                  </div>
                </li>
                <li className="pages">
                  Pages
                  <div className="pagesDropdown">
                    <div>About</div>
                    <div>Contact</div>
                    <div>Faq</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbarRight">
            <div className="navbarSearch" onClick={() => setSearch(!search)}>
              <i className="fa-solid fa-magnifying-glass"></i>
              search
            </div>

            <div className={`searchInput ${search ? "scale" : ""}`}>
              <form onSubmit={HandleSubmit}>
                <input ref={input} placeholder="search" type="text" />
              </form>
            </div>

            <div className="navbarCart">
              <i
                className="fa-solid fa-cart-shopping"
                onClick={() => {
                  setOpen(!open);
                }}
              ></i>
              <span className="count">
                {user ? data.length : basket.length}
              </span>
              <div className={`basketCart ${open ? "active" : ""}`}>
                {data.map((product) => {
                  return (
                    <BaskerCart
                      key={product._id}
                      product={product}
                      local={basket.find((item) => {
                        if (item._id === product._id) {
                          return item;
                        }
                      })}
                    />
                  );
                })}

                <div className="bottomBasket">
                  <Link to={"/checkout"}>
                    <button type="submit" className="checkOut">
                      Check Out
                    </button>
                  </Link> 
                  <Link to={"/ViewCart"}>
                    <button type="submit" className="viewCart">
                      View Cart
                    </button>
                  </Link>
                </div>
                
              </div>
            </div>

            <div
              className={`hamburger-icon ${isOpen ? "open" : ""}`}
              onClick={toggleMenu}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </nav>
      <div className={`hamburgerOverlay ${isOpen ? "" : "openn"}`}>
        <div className="hamburger-menu">
          <div className={`sidebar ${isOpen ? "" : "open"}`}>
            <ul>
              <li onClick={() => toggleAccordion(0)}>
                Home
                {accordionStates[0] && (
                  <ul className="submenu">
                    <li>home 1</li>
                    <li>home 2</li>
                    <li>home 3</li>
                  </ul>
                )}
              </li>
              <li onClick={() => toggleAccordion(1)}>
                Shop
                {accordionStates[1] && (
                  <ul className="submenu">
                    <li>Smartphone</li>
                    <li>Tablets</li>
                    <li>Electronics</li>
                  </ul>
                )}
              </li>
              <li onClick={() => toggleAccordion(2)}>
                Product
                {accordionStates[2] && (
                  <ul className="submenu">
                    <li>Simple</li>
                    <li>Variables</li>
                    <li>Stock</li>
                  </ul>
                )}
              </li>
              <li onClick={() => toggleAccordion(3)}>
                Blog
                {accordionStates[3] && (
                  <ul className="submenu">
                    <li>Blog</li>
                    <li>Details</li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

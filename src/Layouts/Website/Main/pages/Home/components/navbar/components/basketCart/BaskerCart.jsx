import React, { useContext, useEffect, useState } from "react";
import "./BaskerCart.css";
import { Link } from "react-router-dom";
import { BasketContext } from "../../../../../../../../../context/BasketContext";
import { API } from "../../../../../../../../../axios";
import { userContext } from "../../../../../../../../../context/AuthContext";

export default function BaskerCart({ product, local }) {
  const { user } = useContext(userContext);
  const { basket, removeFromBasket, backBasket } = useContext(BasketContext);

  return (
    <>
      <div className="addBasketProduct">
        <div className="img">
          <span>
            {user
              ? backBasket.find((c) => c.productId === product._id)
                  ?.productCount || 0
              : local?.productCount}
            x
          </span>

          <img src={product.images?.[2]?.url} />
        </div>
        <div className="title">
          <h5>{product.title}</h5>
          <p>{product.productPrice}$</p>
        </div>
        <div className="trashicon">
          <i
            className="fa-regular fa-trash-can"
            onClick={() => {
              if (user) {
                const clickedProduct = backBasket.find(
                  (item) => item.productId === product._id
                );
                if (clickedProduct) {
                  removeFromBasket(clickedProduct._id);
                }
              } else {
                removeFromBasket(product._id);
              }
            }}
          ></i>
        </div>
      </div>
    </>
  );
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { getSiteProducts } from "../../../../../Services/Products";
import { useNavigate } from "react-router-dom";
import { BasketContext } from "../../../../../context/BasketContext";

export default function Search() {
 


  return (
    <div>
      {searchData.map((item) => (
        <div className="shopCard" key={item._id}>
          <div className="shopSliderProductImg">
            <img src={item.images[2].url} alt={item.title} />
            <div className={`sale ${item.salePrice ? "" : "close"}`}>SALE</div>
            <div className={`discount ${item.salePrice ? "" : "close"}`}>
              10%
            </div>
            <div className={`soldOut ${item.stock == 0 ? "" : "close"}`}>
              SOLDOUT
            </div>
          </div>
          <div className="shopSliderProductText">
            <p>{item.title}</p>
            <div className="shopCardFlex">
              <div className="shopPrice">
                <p>{item.productPrice}.00 $</p>
                <p className={`discountPrice ${item.salePrice ? "" : "close"}`}>
                  {item.productPrice - 10}.00$
                </p>
              </div>
              {item.stock !== 0 ? (
                <button onClick={() => addToBasket(item)}>Add to card</button>
              ) : (
                <button>Sold Out</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import "./Card.css";
import {
  BasketContext,
} from "../../../../../../../../context/BasketContext";
import { Link } from "react-router-dom";
import { API } from "../../../../../../../../axios";

export default function Card({ item }) {
  const { backBasket } = useContext(BasketContext);

  const [isInBasket, setIsInBasket] = useState(null);

  useEffect(() => {
    setIsInBasket(
      backBasket.find((basketItem) => {
        if (basketItem.productId === item._id) {
          return item;
        }
      })
    );
  }, [backBasket]);

  const { addToBasket } = useContext(BasketContext);

  const addToCard = () => {
    addToBasket(item);
  };

  return (
    <div className="Card">
      <Link to={`/home/${item._id}`}>
        <div className="SliderProductImg">
          <img src={item.images[2].url} alt={item.title} />
          <div className={`sale ${item.salePrice ? "" : "close"}`}>SALE</div>
          <div className={`discount ${item.salePrice ? "" : "close"}`}>10%</div>
          <div className={`soldOut ${item.stock === 0 ? "" : "close"}`}>
            SOLDOUT
          </div>
        </div>
      </Link>
      <div className="sliderProductText">
        <p>{item.title}</p>
        <div className="cardFlex">
          <div className="price">
            <p>{item.productPrice}.00 $</p>
            <p className={`discountPrice ${item.salePrice ? "" : "close"}`}>
              {item.productPrice - 10}.00$
            </p>
          </div>

          {isInBasket ? (
            <Link to="/ViewCart">
              <button>View Card</button>
            </Link>
          ) : item.stock !== 0 ? (
            <button onClick={addToCard}>Add to Card</button>
          ) : (
            <button disabled>Sold Out</button>
          )}
        </div>
      </div>
    </div>
  );
}

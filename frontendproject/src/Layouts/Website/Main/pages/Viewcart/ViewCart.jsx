import React, { useContext, useEffect, useState } from "react";
import "./ViewCart.css";
import { API } from "../../../../../axios";
import { userContext } from "../../../../../context/AuthContext";
import { BasketContext } from "../../../../../context/BasketContext";
import { Link } from "react-router-dom";

export default function ViewCart() {
  const { user } = useContext(userContext);

  const {
    basket,
    removeFromBasket,
    data,
    setData,
    backBasket,
    setBackBasket,
    setBasket,
  } = useContext(BasketContext);

  const [count, setCount] = useState(null);

  const increase = (productId) => {
    if (user) {
      setBackBasket((prevCard) => {
        return prevCard.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              productCount: item.productCount + 1,
            };
          }
          return item;
        });
      });
    } else {
      setBasket((prevBasket) => {
        return prevBasket.map((item) => {
          if (item._id === productId) {
            return {
              ...item,
              productCount: item.productCount + 1,
            };
          }
          return item;
        });
      });
    }
  };

  const decrease = (productId) => {
    if (user) {
      setBackBasket((prevCard) => {
        return prevCard.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              productCount: item.productCount > 1 ? item.productCount - 1 : 1,
            };
          }
          return item;
        });
      });
    } else {
      setBasket((prevBasket) => {
        return prevBasket.map((item) => {
          if (item._id === productId) {
            return {
              ...item,
              productCount: item.productCount > 1 ? item.productCount - 1 : 1,
            };
          }
          return item;
        });
      });
    }
  };

  const updateCard = () => {
    const updateRequests = backBasket.map((item) => {
      setCount(item.productCount);
      return API.put(`/site/basket/${item._id}`, {
        productCount: item.productCount,
      });
    });

    Promise.all(updateRequests)
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  return (
    <div className="viewCard">
      <div className="viewCardContainer">
        <div className="inViewCard">
          <div className="myLittleCard">
            {data.map((item) => {
              return (
                <div className="littleCard" key={item._id}>
                  <img src={item.images?.[2]?.url} style={{ width: "100px" }} />
                  <p>{item.title}</p>
                  <p>{item.productPrice}</p>
                  <div className="quantity">
                    <button onClick={() => increase(item._id)}>+</button>
                    <p>
                      {user
                        ? backBasket.find((c) => c.productId === item._id)
                            ?.productCount || 0
                        : basket.find((e) => e._id === item._id)?.productCount}
                    </p>
                    <button onClick={() => decrease(item._id)}>-</button>
                  </div>
                  <p>
                    total:
                    {user
                      ? item.productPrice *
                        (backBasket.find((e) => e.productId === item._id)
                          ?.productCount || 0)
                      : item.productPrice *
                        basket.find((c) => c._id === item._id)?.productCount}
                    .00$
                  </p>
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-regular fa-trash-can"
                    onClick={() => {
                      if (user) {
                        const clickedProduct = backBasket.find(
                          (prod) => prod.productId === item._id
                        );
                        if (clickedProduct) {
                          removeFromBasket(clickedProduct._id);
                        }
                      } else {
                        removeFromBasket(item._id);
                      }
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
          <div className="ordersButton">
            <button onClick={() => updateCard()}> Update Card</button>
            <button>Continue Shopping</button>
            <button
              onClick={() => {
                if (user) {
                  backBasket.forEach((item) => {
                    removeFromBasket(item._id);
                    setData([]);
                  });
                } else {
                  setBasket([]);
                }
              }}
            >
              Clear Card
            </button>
          </div>
          <div className="cardTotal">
            <h1>Card Total</h1>
            <p>
              subtotal:
              {data
                .reduce((acc, product) => {
                  const item = user
                    ? backBasket.find((e) => e.productId === product?._id)
                    : basket.find((e) => e._id === product?._id);
                  return acc + product?.productPrice * (item?.productCount || 0);
                }, 0)
                .toFixed(2)}
              $
            </p>

            <Link className="link1" to={"/checkout"}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

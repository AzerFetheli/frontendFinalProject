import React, { useContext, useEffect, useState } from "react";
import "./CheckOut.css";
import { API } from "../../../../../axios";
import { userContext } from "../../../../../context/AuthContext";
import { BasketContext } from "../../../../../context/BasketContext";
export default function CheckOut() {
  const { user } = useContext(userContext);
  const { data, setData, backBasket, setBackBasket, getSingleBackProduct } =
    useContext(BasketContext);

  const addOrder = (e) => {
    e.preventDefault();
    const orderData = {
      products: backBasket.map((item) => ({
        productId: item.productId,
        productCount: item.productCount,
      })),
    };

    API.post("/site/orders", orderData)
      .then((res) => {
        console.log(res);
        backBasket.map((item) => {
          API.delete(`/site/basket/${item._id}`);
        });
        setData([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="checkOut">
      {data.length === 0 && (
        <div className="emptyCheckOut">
          <img
            src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
            alt=""
          />
          <p>Cart is empty</p>
        </div>
      )}
      {data.length > 0 && (
        <div className="checkOutContainer">
          <form className="checkOutForm" onSubmit={addOrder}>
            <div className="checkOutContactInputs">
              <p className="checkOutText1">Contact</p>
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={user.email}
              />
            </div>

            <div className="checkOutDeliveryInputs">
              <p className="checkOutText1">Delivery</p>
              <div>
                <input type="text" placeholder="First Name" value={user.name} />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={user.surname}
                />
              </div>
              <input type="text" className="adressInput" placeholder="Adress" />
              <div>
                <input type="text" placeholder="Postal Code" />
                <input type="text" placeholder="City" />
              </div>
            </div>
            <button> Complete Order </button>
          </form>
          <div className="checkOutProducts">
            {data.map((prod) => {
              return (
                <div className="checkOutProducts1" key={prod._id}>
                  <div className="checkOutProducutsData">
                    <div className="checkOutProductImage">
                      <span>
                        {backBasket.find((c) => c.productId === prod._id)
                          ?.productCount || 0}
                      </span>
                      <img src={prod?.images[2]?.url} />
                    </div>
                    <div className="checkOutProductTitle">{prod.title}</div>
                  </div>
                  <div>
                    {" "}
                    {prod.productPrice *
                      (backBasket.find((e) => e.productId === prod._id)
                        ?.productCount || 0)}
                    .00$
                  </div>
                </div>
              );
            })}
            <div className="checkOutProducts2">
              <p>SubTotal:</p>
              <p>
                {data
                  .reduce((acc, product) => {
                    const item = backBasket.find(
                      (e) => e.productId === product._id
                    );
                    return (
                      acc + product.productPrice * (item?.productCount || 0)
                    );
                  }, 0)
                  .toFixed(2)}
                $
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import "./Details.css";
import { getSingleProduct } from "../../../../../Services/Products";
import { useParams } from "react-router-dom";
import { BasketContext } from "../../../../../context/BasketContext";

export default function Details() {
  const [detailsProduct, setDetailsProduct] = useState({});
  const { addToBasket } = useContext(BasketContext);
  const { title, images, description } = detailsProduct;
  let { _id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProduct(_id);
        setDetailsProduct(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [_id]);

  return (
    <div className="detailContainerHome">
      <div className="containerDetails">
        <div className="image-container">
          <img className="main-image" src={detailsProduct.images?.[2]?.url} />
          <div className="thumbnail-container">
            <img className="thumbnail" src={detailsProduct.images?.[0]?.url} />
            <img className="thumbnail" src={detailsProduct.images?.[1]?.url} />
            <img className="thumbnail" src={detailsProduct.images?.[3]?.url} />
          </div>
        </div>
        <div className="text-container">
          <h1>{detailsProduct.title}</h1>
          <p className="detailsDescription">{detailsProduct.description}</p>
          <div className="rate">
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <span>${detailsProduct.productPrice}.00</span>
          <button onClick={() => addToBasket(detailsProduct)}>
            Add To Card
          </button>
        </div>
      </div>
    </div>
  );
}

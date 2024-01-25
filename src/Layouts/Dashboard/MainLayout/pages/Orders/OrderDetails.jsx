import React, { useEffect, useState } from "react";
import { API } from "../../../../../axios";
import { useParams } from "react-router-dom";
import "./OrdersDetails.css";
import Loader from "../../../../Website/Main/pages/loader/Loader";

export default function OrderDetails() {
  const [singleProduct, setSingleProduct] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();

  useEffect(() => {
    API.get("/dashboard/orders?page=1&perPage=9999999").then((res) => {
      setOrders(res.data.data.data);
    });
  }, []);

  const singleOrder = orders.find((item) => _id === item._id);

  const getSingleBackOrdersProduct = async () => {
    if (!singleOrder?.products || !Array.isArray(singleOrder.products)) {
      return;
    }

    let newArr = singleOrder.products.map((item) => {
      return API.get(`/site/products/${item.productId}`);
    });

    try {
      let resolvedData = await Promise.all(newArr);
      resolvedData = resolvedData.reduce((acc, item) => {
        acc[item.data.data._id] = item.data.data;
        return acc;
      }, {});
      setSingleProduct(resolvedData);
    } catch (error) {
      console.error("Error fetching product data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleOrder) {
      getSingleBackOrdersProduct();
    }
  }, [singleOrder]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="tableDetails">
      <table className="tableDetailsTable">
        <thead>
          <tr>
            <th className="tableDetailstr">Name</th>
            <th className="tableDetailstr">Product Title</th>
            <th className="tableDetailstr">Quantity</th>
            <th className="tableDetailstr">Item Price</th>
            <th className="tableDetailstr">Amount</th>
          </tr>
        </thead>
        <tbody>
          {singleOrder.products.map((item) => (
            <tr key={item.productId}>
              <td className="tableDetailstd">{singleOrder.customer.name}</td>
              <td className="tableDetailstd">
                {singleProduct[item.productId]?.title}
              </td>
              <td className="tableDetailstd">{item.productCount}</td>
              <td className="tableDetailstd">
                {singleProduct[item.productId]?.productPrice}
              </td>
              <td className="tableDetailstd">
                {item.productCount *
                  singleProduct[item.productId]?.productPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

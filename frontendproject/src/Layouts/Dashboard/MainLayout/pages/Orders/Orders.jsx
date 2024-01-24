import React, { useEffect, useState } from "react";
import OrdersTable from "./OrdersTable";
import { API } from "../../../../../axios";
import "./Orders.css"

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const getOrders = () => {
    const page=1  
    const perPage=9999925
    API.get(`/dashboard/orders?page=${page}&perPage=${perPage}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <OrdersTable data={orders.data} getOrders={getOrders} />
    </>
  );
}

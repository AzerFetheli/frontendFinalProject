import React, { useEffect, useState } from "react";
import "./DashBoardHome.css";
import { API } from "../../../../../axios";
export default function DashBoardHome() {
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    API.get("dashboard/orders?page=1&perPage=999").then((res) => {
      setAllOrders(res.data.data.data);
    });
  }, []);

  const pendingOrders = [];
  allOrders.find((item) => {
    if (item.status === "pending") {
      pendingOrders.push(item);
    }
  });

  const processingOrder = [];
  allOrders.find((item) => {
    if (item.status === "proccesing") {
      processingOrder.push(item);
    }
  });

  const deliveredOrder = [];
  allOrders.find((item) => {
    if (item.status === "delivered") {
      deliveredOrder.push(item);
    }
  });

  return (
    <>
      <div className="dashboard">
        <div className="ordersInformation">
          <div className="ordersInformationBlock1">
            <img src="../../../../../src/assets/Layer.png" />
            <p className="dashboardText1"> Today Orders </p>
            <p className="dashboardText2"> $314.00 </p>
            <div className="ordersInformationBottom">
              <div>
                <p className="dashboardText3"> Cash: </p>
                <p className="dashboardText3"> $256.00 </p>
              </div>
              <div>
                <p className="dashboardText3"> Card: </p>
                <p className="dashboardText3"> $58.00 </p>
              </div>
              <div>
                <p className="dashboardText3"> Credit: </p>
                <p className="dashboardText3"> $0.00 </p>
              </div>
            </div>
          </div>
          <div className="ordersInformationBlock2">
            <img src="../../../../../src/assets/Layer.png" />
            <p className="dashboardText1"> Yesterday Orders </p>
            <p className="dashboardText2"> $754.00 </p>
            <div className="ordersInformationBottom">
              <div>
                <p className="dashboardText3"> Cash: </p>
                <p className="dashboardText3"> $312.00 </p>
              </div>
              <div>
                <p className="dashboardText3"> Card: </p>
                <p className="dashboardText3"> $408.00 </p>
              </div>
              <div>
                <p className="dashboardText3"> Credit: </p>
                <p className="dashboardText3"> $36.00 </p>
              </div>
            </div>
          </div>
          <div className="ordersInformationBlock3">
            <img src="../../../../../src/assets/Cart White.png" />
            <p className="dashboardText1"> This Month </p>
            <p className="dashboardText2"> $37826.00 </p>
          </div>
          <div className="ordersInformationBlock4">
            <img src="../../../../../src/assets/Credit Card.png" />
            <p className="dashboardText1"> Last Month </p>
            <p className="dashboardText2"> $52421.00 </p>
          </div>
          <div className="ordersInformationBlock5">
            <img src="../../../../../src/assets/Credit Card.png" />
            <p className="dashboardText1"> All Times Sales </p>
            <p className="dashboardText2"> $916422.00 </p>
          </div>
        </div>
        <div className="dashboardOrderStatistics">
          <div className="dashboardOrderStatisticsBlock1">
            <div className="dashboardOrderStatisticsBlockImage1">
              <img src="../../../../../src/assets/Cart Orange.png" />
            </div>
            <div>
              <p className="dashboardText4"> Total Order </p>
              <p className="dashboardText5"> {allOrders.length} </p>
            </div>
          </div>
          <div className="dashboardOrderStatisticsBlock2">
            <div className="dashboardOrderStatisticsBlockImage2">
              <img src="../../../../../src/assets/Refresh.png" />
            </div>
            <div>
              <p className="dashboardText4"> Orders Pending </p>
              <p className="dashboardText5"> {pendingOrders?.length} </p>
            </div>
          </div>
          <div className="dashboardOrderStatisticsBlock3">
            <div className="dashboardOrderStatisticsBlockImage3">
              <img src="../../../../../src/assets/Truck Green.png" />
            </div>
            <div>
              <p className="dashboardText4"> Orders Processing </p>
              <p className="dashboardText5"> {processingOrder?.length} </p>
            </div>
          </div>
          <div className="dashboardOrderStatisticsBlock4">
            <div className="dashboardOrderStatisticsBlockImage4">
              <img src="../../../../../src/assets/Check.png" />
            </div>
            <div>
              <p className="dashboardText4"> Orders Delivered </p>
              <p className="dashboardText5"> {deliveredOrder.length} </p>
            </div>
          </div>
        </div>
        <img src="../../../../../src/assets/1.jpg" />
      </div>
    </>
  );
}

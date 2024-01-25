import React, { useContext, useState } from "react";
import {
  BarChartOutlined,
  SlackOutlined,
  CompassOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ProfileCall } from "../../../Services/Auth";
import { userContext } from "../../../context/AuthContext";
import AdminHeader from "./components/AdminHeader";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link>Dashboard</Link>, "1", <BarChartOutlined />),
  getItem(<Link>Catalog</Link>, "sub2", <SlackOutlined />, [
    getItem(<Link to={"products"}>Products</Link>, "6"),
    getItem(<Link to={"brends"}>Brends</Link>, "8"),
  ]),
  getItem(<Link to={"orders"}>Orders</Link>, "2", <CompassOutlined />),

  getItem(<Link to={"ourstaf"}>OurStaf</Link>, "9", <TeamOutlined />),
];
const MainDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "gray",
          }}
        >
            <AdminHeader/>
        </Header>
        <Content
          style={{
            padding:"0 60px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainDashboard;

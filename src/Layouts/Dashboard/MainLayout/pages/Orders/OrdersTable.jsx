import { React } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { Button, Select, Space, Table } from "antd";
import { API } from "../../../../../axios";

export default function OrdersTable({ data, getOrders }) {
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };
  const navigate = useNavigate();

  const handleChange = (value, record) => {
    API.put(`/dashboard/orders/${record._id}`, { status: value }).then(
      (res) => {
        getOrders();
      }
    );
  };

  const redirectToDetailsPage = (_id) => {
    navigate(`orders/${_id.toString()}`);
  };
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => customer.name,
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
      title: "method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={`
        ${text === "delivered" ? "deliveredClass" : ""}
        ${text === "pending" ? "pendingClass" : ""}
        ${text === "cancel" ? "cancelClass" : ""}
        ${text === "proccesing" ? "proccesingClass" : ""}
        
        `}
        >
          {text}
          {console.log(text)}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Select
            defaultValue={record.status}
            style={{
              width: 120,
            }}
            onChange={(value) => handleChange(value, record)}
            options={[
              {
                value: "delivered",
                label: "Delivered",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "cancel",
                label: "Cancel",
              },
              {
                value: "proccesing",
                label: "Proccesing",
              },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => redirectToDetailsPage(record._id)}
          >
            Look
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />;
}

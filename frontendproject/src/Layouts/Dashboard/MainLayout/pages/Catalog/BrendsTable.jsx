import React, { useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { API } from "../../../../../axios";
import BrendUpdateModal from "./brendUpdateModal";

export default function BrandTable({ data, getBrends }) {
  const [brendUpdate, setBrendUpdate] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const updateToggle = () => {
    setBrendUpdate(!brendUpdate);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a style={{ userSelect: "none" }}>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image && image.url ? (
          <img
            src={image.url}
            alt="brand"
            style={{ width: "50px", height: "50px" }}
          />
        ) : null,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => formatDate(createdAt),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => formatDate(updatedAt),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    let customData = {
      ...record,
      src: record.image,
    };
    delete customData.image;

    setSelectedBrand(customData);
    updateToggle();
  };
  const { confirm } = Modal;
  const handleDelete = (record) => {
    confirm({
      title: ` Do you want to delete "${record.name} "?`,
      content: "This action cannot be undone.",
      onOk() {
        API.delete(`/dashboard/brands/${record._id}`)
          .then(() => {
            getBrends();
          })
          .catch((error) => {
            console.error(error);
          });
      },
    });
  };

  return (
    <>
      <BrendUpdateModal
        updateToggle={updateToggle}
        brendUpdate={brendUpdate}
        setSelectedBrand={setSelectedBrand}
        brand={selectedBrand}
        getBrends={getBrends}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
}

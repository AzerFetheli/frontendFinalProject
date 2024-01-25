import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Modal, Switch } from "antd";
import { API } from "../../../../../../axios";
import ProductUpdateModal from "./ProductUpdateModal";

const ProductsTable = ({ data, getProduct }) => {
  const [productUpdateModal, setProductUpdateModal] = useState(false);

  const updateModalToggle = () => {
    setProductUpdateModal(!productUpdateModal);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handlePublishChange = (checked, record) => {
    const updatedProduct = { ...record, isPublish: checked };

    API.put(`/dashboard/products/${record._id}`, updatedProduct)
      .then(() => {
        getProduct();
        const updatedData = data.map((item) =>
          item._id === record._id ? updatedProduct : item
        );
        setData(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "images",
      dataIndex: "images",
      key: "images",
      render: (images) =>
        images && images[0].url ? (
          <img
            src={images[2].url}
            alt="brand"
            style={{ width: "50px", height: "50px" }}
          />
        ) : null,
    },

    {
      title: "name",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
    },

    {
      title: "product price",
      dataIndex: "productPrice",
      key: "productPrice",
      sorter: (a, b) => a.productPrice - b.productPrice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "sale price",
      dataIndex: "salePrice",
      key: "salePrice",
      sorter: (a, b) => a.salePrice - b.salePrice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "PUBLISHED",
      dataIndex: "isPublish",
      key: "isPublish",
      width: "7%",
      render: (isPublish, record) => (
        <Switch
        defaultValue={isPublish}
          onChange={(checked) => handlePublishChange(checked, record)}
        />
      ),
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

  const [selectedProduct, setSelectedProduct] = useState("");

  const handleEdit = (record) => {
    let customData = {
      ...record,
      src: record.images,
    };
    delete customData.images;

    setSelectedProduct(customData);
    updateModalToggle();
  };

  const { confirm } = Modal;
  const handleDelete = (record) => {
    confirm({
      title: ` Do you want to delete "${record.title} "?`,
      content: "This action cannot be undone.",
      onOk() {
        API.delete(`/dashboard/products/${record._id}`)
          .then(() => {
            getProduct();
          })
          .catch((error) => {
            console.error(error);
          });
      },
    });
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
      <ProductUpdateModal
        updateModalToggle={updateModalToggle}
        productUpdateModal={productUpdateModal}
        setProductUpdateModal={setProductUpdateModal}
        setSelectedProduct={setSelectedProduct}
        product={selectedProduct}
        getProduct={getProduct}
      />
    </>
  );
};
export default ProductsTable;

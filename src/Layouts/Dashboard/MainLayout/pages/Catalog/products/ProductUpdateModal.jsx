import React, { useEffect, useState } from "react";
import "./ProductsModal.css";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import FileConverter from "../../../../../../Services/FileConverter";
import { API } from "../../../../../../axios";

export default function ProductUpdateModal({
  productUpdateModal,
  setProductUpdateModal,
  updateModalToggle,
  product,
  setSelectedProduct,
  getProduct,
}) {
  const [updateFile, setUpdateFile] = useState(null);
  const [editedImages, setEditedImages] = useState([]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ brandId: value });
  };
  const handleSubmit = (values) => {
    if (updateFile) {
      values.images = [editedImages[1], editedImages[2], updateFile[0], updateFile[1]].filter(
        Boolean
      );
    } else {
      values.images = editedImages.filter(Boolean);
    }

    console.log(values);
      API.put(`/dashboard/products/${product._id}`, values)
        .then((res) => {
          console.log(res);
          getProduct();
          
        })
        .catch((err) => {
          console.log(err);
        });
      updateModalToggle();
  };
  useEffect(() => {
    console.log(product);

    if (product) {
      const fields = Object.keys(form.getFieldsValue());
      fields.forEach((item) => {
        const fieldValue = Array.isArray(product[item])
          ? product[item].join(", ")
          : product[item];
        form.setFieldsValue({ [item]: fieldValue });
      });
      setEditedImages([
        { public_id: product?.src[2]?.public_id, url: product?.src[2]?.url },
        { public_id: product?.src[1]?.public_id, url: product?.src[1]?.url },
        { public_id: product?.src[0]?.public_id, url: product?.src[3]?.url },
        { public_id: product?.src[3]?.public_id, url: product?.src[0]?.url },
      ]);
    }
  }, [product]);

  const [form] = Form.useForm();

  return (
    <div
      className={`productUpdateModalOverlay ${
        productUpdateModal ? "toggle" : ""
      }`}
    >
      <div className="productUpdateModal">
        <Form
          onFinish={(values) => handleSubmit(values)}
          form={form}
          initialValues={product}
        >
          <div>
            <Form.Item
              label="title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="productPrice" name="productPrice">
              <Input />
            </Form.Item>

            <Form.Item label="salePrice" name="salePrice">
              <Input />
            </Form.Item>
            <Form.Item label="stock" name="stock">
              <Input />
            </Form.Item>

            <Form.Item label="brandId" name="brandId">
              <Select
                defaultValue="Zara"
                onChange={(value) => handleChange(value)}
                options={[
                  {
                    value: "e4a61430-adfb-11ee-aa66-073a661e97ae",
                    label: "Nike",
                  },
                  {
                    value: "f9323dc0-adfb-11ee-aa66-073a661e97ae",
                    label: "Puma",
                  },
                  {
                    value: "06ba71b0-adfc-11ee-aa66-073a661e97ae",
                    label: "TomyHilfiger",
                  },
                  {
                    value: "1a1b1390-adfc-11ee-aa66-073a661e97ae",
                    label: "Zara",
                  },
                  {
                    value: "2b2171c0-adfc-11ee-aa66-073a661e97ae",
                    label: "PullBear",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label="description" name="description">
              <TextArea rows={4}></TextArea>
            </Form.Item>

            <Form.Item
              label="images"
              name="images"
          
            >
              <Input
                type="file"
                multiple={true}
                onChange={(e) => {
                  FileConverter(e)
                    .then((res) => {
                      console.log(res);
                      setUpdateFile(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </Form.Item>
            {console.log(editedImages)}
            {editedImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl.url} style={{ width: "50px" }} />
            ))}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>

        <p onClick={updateModalToggle}>x</p>
      </div>
    </div>
  );
}

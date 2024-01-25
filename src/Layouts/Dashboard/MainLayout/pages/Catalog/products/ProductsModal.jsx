import { useState } from "react";

import { Button, Form, Input, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import React from "react";
import FileConverter from "../../../../../../Services/FileConverter";
import { API } from "../../../../../../axios";

export default function ProductsModal({
  productModalHandle,
  productModal,
  getProduct,
}) {
  const [form] = Form.useForm();
  const [uploadedImages, setUploadedImages] = useState([]);
  const { TextArea } = Input;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    form.setFieldsValue({ brandId: value });
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const formDataWithImages = { ...values, images: uploadedImages };

      const response = await API.post(
        "/dashboard/products",
        formDataWithImages
      );
      getProduct();
      productModalHandle();

      console.log("API Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`productModalOverlay ${productModal ? "toggle" : ""}`}>
      <div className="productModal">
        <Form onFinish={handleSubmit} form={form}>
          <div>
            <Form.Item label="title" name="title">
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

            <Form.Item label="image" name="image">
              <Input
                type="file"
                multiple={true}
                onChange={(e) => {
                  FileConverter(e)
                    .then((res) => {
                      console.log(res);
                      setUploadedImages(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </Form.Item>

            <Form.Item label="description" name="description">
              <TextArea rows={4}></TextArea>
            </Form.Item>

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

        <i className="fa-solid fa-xmark" onClick={productModalHandle}></i>
      </div>
    </div>
  );
}

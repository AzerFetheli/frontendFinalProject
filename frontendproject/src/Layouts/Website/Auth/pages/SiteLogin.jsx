import React, { useContext } from "react";
// import "./Login.css"
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../../../context/AuthContext";
import { LoginCall } from "../../../../Services/Auth";
import { APIwithToken } from "../../../../axios";
import { BasketContext } from "../../../../context/BasketContext";

const SiteLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const { basket, setBasket, setBackBasket } = useContext(BasketContext);

  const onFinish = (values) => {
    console.log("Success:", values);
    LoginCall(values)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("token", data.data.token);
        if (data.data.user) {
          if ((basket || []).length > 0) {
            const formattedBasket = basket.map((item) => ({
              productId: item._id,
              productCount: item.productCount,
            }));

            console.log(formattedBasket);

            const postmanBasket = formattedBasket.map((item) => ({
              productId: item.productId,
              productCount: item.productCount,
            }));
            console.log(postmanBasket);

            const postmanRequest = { basket: postmanBasket };
            console.log(postmanRequest);

            APIwithToken(data.data.token)
              .post("/site/basket", postmanRequest)
              .then((res) => {
                setBasket([]);
                setUser(data.data.user);
                navigate("/");
                location.href = "/";
              });
          } else {
            setBasket([]);
            setUser(data.data.user);
            location.href = "/";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="dashboardLogin">
      <div className="dashboardLoginContainer">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Link to={"/siteregister"}>Create a new account</Link>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {" "}
              Sign In{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SiteLogin;

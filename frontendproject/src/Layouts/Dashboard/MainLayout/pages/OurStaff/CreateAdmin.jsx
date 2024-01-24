// CreateAdmin.js
import React from 'react';
import { Button, Form, Input } from 'antd';
import { API } from '../../../../../axios';
import "./Staff.css"

export default function CreateAdmin({ handleAdmin, createAdmin, getUser }) {
    const onFinish = (values) => {
        console.log('Success:', values);
        API.post("/dashboard/register", values)
            .then(() => {
                getUser();
            })
            .catch((err) => {
                console.log(err);
            });
        handleAdmin();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderForm = () => (
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
                label="Username"
                name="name"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Surname"
                name="surname"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password />
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
        </Form>
    );

    return (
        <div className={`adminModalOverlay ${createAdmin ? "visible" : ""}`}>
            <div className="adminModal">
                {renderForm()}
                <p onClick={handleAdmin}>x</p>
            </div>
        </div>
    );
}

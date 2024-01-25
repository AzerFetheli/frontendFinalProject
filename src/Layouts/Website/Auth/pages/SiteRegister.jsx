import { Button, Form, Input } from 'antd'
import React from 'react'
import { API } from '../../../../axios';
import { useNavigate } from 'react-router-dom';


export default function SiteRegister() {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        API.post("/site/register", values)
            .then((res) => {
                console.log(res)
                navigate('/sitelogin');
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='dashboardLogin'>
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
                    autoComplete="off" >

                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]} >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="surname"
                        name="surname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]} >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]} >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]} >
                        <Input.Password />
                    </Form.Item>




                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }} >
                        <Button type="primary" htmlType="submit"> Sign In </Button>
                    </Form.Item>
                </Form>
            </div >
        </div >

    )
}

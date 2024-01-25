import React, { useContext } from 'react';
import "./Login.css"
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginCall } from '../../../../../Services/Auth';
import { userContext } from '../../../../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const {setUser}=useContext(userContext)

    const onFinish = (values) => {
        console.log('Success:', values);
        LoginCall(values)
            .then(({ data }) => {
                localStorage.setItem("token", data.data.token);
                setUser(data.data.user)
                navigate('/dashboard');
                
            
            })
            .catch((err) => {
                console.log(err);
            });
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
            </div>
        </div>
    );
}

export default Login;
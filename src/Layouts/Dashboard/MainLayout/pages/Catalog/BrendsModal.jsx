
import { useState } from "react"
import { API } from "../../../../../axios"
import FileConverter from "../../../../../Services/FileConverter"
import { Button, Form, Input } from "antd"


export default function BrendsModal({ brendsModalHandle, brendsModal, getBrends }) {
    const [file, setFile] = useState(null)
    const handleSubmit = (values) => {
        values.image = file[0]

        API.post("/dashboard/brands", values)
            .then((res) => {
                console.log(res)
                getBrends()
            }).catch((err) => {
                console.log(err)
            })
        brendsModalHandle()


    }
    const [form] = Form.useForm()
    return (
        <div className={`brendsModalOverlay ${brendsModal ? "toggle" : ""}`}>
            <div className="brendsModal">
                <Form onFinish={handleSubmit} form={form}>
                    <div>
                        <Form.Item
                            label="name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input type="file"
                                onChange={(e) => {
                                    FileConverter(e).then((res) => {
                                        console.log(res)
                                        setFile(res)
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

                <i className="fa-solid fa-xmark" onClick={brendsModalHandle}></i>
            </div>
        </div>
    )
}


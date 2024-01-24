import React, { useEffect, useState } from 'react'
import "./brendsUpdateModal.css"
import FileConverter from '../../../../../Services/FileConverter'
import { Button, Form, Input } from 'antd'
import { API } from '../../../../../axios'


export default function BrendUpdateModal({ updateToggle, brendUpdate, brand, getBrends, setSelectedBrand }) {
    const [updateFile, setUpdateFile] = useState(null)
    const handleSubmit = (values) => {
        values.image = updateFile[0]
        console.log(values)
        API.put(`/dashboard/brands/${brand._id}`, values)
            .then((res) => {
                console.log(res)
                getBrends()
            }).catch((err) => {
                console.log(err)
            })
        updateToggle()
    }
    const [form] = Form.useForm()

    useEffect(() => {
        if (brand) {
            const fields = Object.keys(form.getFieldsValue())
            fields.forEach((item) => {
                form.setFieldValue(item, brand[item])

            })

        }
        console.log(brand)

    }, [brand])

    return (
        brand ? <div className={`brendsUpdateModalOverlay ${brendUpdate ? "toggle" : ""}`}>
            <div className="brendsUpdateModal">
                {console.log(brand)}
                <Form onFinish={handleSubmit} form={form} initialValues={brand} >
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
                                        setUpdateFile(res)
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }}
                            />
                        </Form.Item>
                        <img src={brand.src.url} alt=""  style={{width:"50px"}}/>
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

                <i className="fa-solid fa-xmark" onClick={() => {
                    updateToggle()
                    setSelectedBrand(false)
                }}></i>
            </div>
        </div> : null
    )
}

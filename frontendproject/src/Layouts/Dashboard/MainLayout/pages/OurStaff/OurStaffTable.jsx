import React from 'react'
import { Button, Space, Table, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { API } from '../../../../../axios';
import "./Staff.css"

export default function OurStaffTAble({ data, getUser}) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        { 
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',

        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <Space>
                    <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
            ),
        },
       
    ];
    const { confirm } = Modal;
    const handleDelete = (record) => {
        confirm({
            title:` Do you want to delete ${record.role} "${record.name} ${record.surname}"?`,
            content: 'This action cannot be undone.',
            onOk() {
                API.delete(`/dashboard/users/${record._id}`)
                    .then(() => {
                        getUser();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    };

    return <Table columns={columns} dataSource={data} rowKey={(record) => record._id} />

}

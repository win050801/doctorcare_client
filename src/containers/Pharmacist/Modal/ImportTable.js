import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const ImportTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
  ]);

  const onEdit = (record) => {
    form.setFieldsValue(record);
  };

  const onDelete = (record) => {
    setData(data.filter((item) => item.key !== record.key));
  };

  const onSave = (values) => {
    const newData = [...data];
    const index = newData.findIndex((item) => values.key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...values });
      setData(newData);
      form.resetFields();
    } else {
      newData.push(values);
      setData(newData);
      form.resetFields();
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <div>
            <Button type="primary" onClick={() => onEdit(record)}>
              Sửa
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(record)}
            >
              <Button type="danger" style={{ marginLeft: 10 }}>
                Xóa
              </Button>
            </Popconfirm>
          </div>
        ) : null,
    },
  ];

  const onFinish = (values) => {
    const { name, age, address } = values;
    const newData = {
      key: (data.length + 1).toString(),
      name,
      age,
      address,
    };
    setData([...data, newData]);
    form.resetFields();
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} style ={{display: 'flex'}}>
        <Form.Item name="name" style={{ width:'30%', backgroundColor:''}}  rules={[{ required: true }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="quantity" style={{ width:'15%',marginLeft:'2%'}} rules={[{ required: true }]}>
          <Input placeholder="Số lượng" />
        </Form.Item>
        <Form.Item name="storageUnit"  style={{ width:'15%',marginLeft:'2%'}} rules={[{ required: true }]}>
          <Input placeholder="Đơn vị" />
        </Form.Item>
        <Form.Item name="expiryDate"  style={{ width:'15%',marginLeft:'2%'}} rules={[{ required: true }]}>
          <Input placeholder="Hạn sử dụng" />
        </Form.Item>
        <Button style={{ width:'15%',marginLeft:'5%'}} type="primary" htmlType="submit">
          Add
        </Button>
       
      </Form>
      
      <br />
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default ImportTable;
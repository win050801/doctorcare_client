import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';


const ExportTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Parâk',
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
              Edit
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(record)}
            >
              <Button type="danger" style={{ marginLeft: 10 }}>
                Delete
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

export default ExportTable;
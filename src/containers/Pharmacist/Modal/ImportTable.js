
import React, { useState,useEffect } from 'react';
import { Table, Input, Button, Popconfirm, Form,Select, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import ImportWarehouse from './ImportWarehouseModal';

const ImportTable = () => {
  const [form] = Form.useForm();

  const [medicineData, setMedicineData] = useState([]);

  const [searchMedicine, setSearchMedicine] = useState("");

  const [medicineId, setMedicineId] = useState();

  const [expiryDate, setExpiryDate] = useState();

  const [reset, setReset] = useState(false);

  const [quantity, setQuantity] = useState(0);

  const [data, setData] = useState([
  ]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/`, {
            params:{
              category_id: -1,
              medicine_id: -1,
              key_search: searchMedicine,
              status: 1,
              sort_by: 0
            }
        });
        setMedicineData(response.data.data);
      };
      fetchCategoryData();
  }, [searchMedicine]);

  const handleSelectChangeName = (value) => {
    setSearchMedicine(`${value}`)
    const selectedMedicine = medicineData.find((medicine) => medicine.name === `${value}`);
    setMedicineId(selectedMedicine ? selectedMedicine.id: -1);
  }

  

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
      title: 'STT',
      dataIndex: 'key',
      editable: true,
      width: 20,
    },
    {
      title: 'Tên thuốc',
      dataIndex: 'name',
      editable: true,
      width: 250,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'storageUnit',
      editable: true,
      width: 100,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiryDate',
      editable: true,
    },
    {
      title: 'Hành động',

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
    const { name, storageUnit } = values;
    const newProduct = {
      name,
      medicineId,
      quantity,
      storageUnit,
      expiryDate,
    };

    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
    const existingProductIndex = data.findIndex((product) => product.name === name);

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong danh sách, cộng thêm quantity cho sản phẩm này
      const existingProduct = data[existingProductIndex];
      const updatedProduct = {
        ...existingProduct,
        quantity: parseFloat(parseFloat(existingProduct.quantity) + parseFloat(quantity)),
      };
      setData([
        ...data.slice(0, existingProductIndex),
        updatedProduct,
        ...data.slice(existingProductIndex + 1),
      ]);
    } else {
      // Sản phẩm chưa tồn tại trong danh sách, thêm sản phẩm mới vào danh sách
      setData([...data, { ...newProduct, key: data.length + 1 }]);
    }

    setSearchMedicine("");
    setExpiryDate(null);
    form.resetFields();
    
   
  };

  console.log(data);

  const handleSelectChangeExpiryDate = (date, dateString) => {
      setExpiryDate(dateString);  
  }

  const handleChangeQuantity = (event) => {
    const target = event.target;
    const value = target.value;
    setQuantity(value)
  };

  const handleReset = () => {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 0);
   

  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} style ={{display: 'flex'}}>
        <Form.Item name="name" style={{ width:'30%', backgroundColor:''}}  rules={[{ required: true }]}>
          <Select onChange={handleSelectChangeName}  showSearch className='input name' >
              {medicineData.map(option => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="quantity" style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }]}>
          <Input  type="number" name ="quantity" onChange={handleChangeQuantity} placeholder="Số lượng" />
        </Form.Item>
        <Form.Item name="storageUnit"  style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }]}>
          <Input placeholder="Đơn vị" />
        </Form.Item>
        {/* <Form.Item  name="expiryDate"  style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }]}> */}
          <DatePicker defaultValue={reset ? null : moment()} onChange={handleSelectChangeExpiryDate}  style={{ height:"32px",width:'15%',marginLeft:'2%', marginTop:"5px"}} placeholder="Hạn sử dụng" > </DatePicker>
          {/* <Input placeholder="Hạn sử dụng" /> */}
        {/* </Form.Item> */}
        <Button ononClick={handleReset}  style={{ width:'15%',marginLeft:'5%', marginTop:"5px"}} type="primary" htmlType="submit">
          Thêm thuốc
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
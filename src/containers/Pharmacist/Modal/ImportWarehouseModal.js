import React, { useState,useEffect } from 'react';
import { Button, Input, Modal,Table,Select, Form, DatePicker, Popconfirm } from 'antd';
import './ImportWarehouseModal.scss'
import { Link } from 'react-router-dom';
import ImportTable from './ImportTable';
import axios from "axios";
import moment from 'moment';

const ImportWarehouse = () =>{

   const [open, setOpen] = useState(false);

   const [searchEmployee, setSearchEmployee] = useState("");

   const [employeeData, setEmployeeData] = useState([]);

   const [employeeId, setEmployeeId] = useState([]);

   const [note, setNote] = useState("");

   useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/employees/`, {
            params:{
              employee_id: -1,
              key_search: searchEmployee,
              is_login: -1,
              is_active: 1
            }
        });
        setEmployeeData(response.data.data);
      };
      fetchCategoryData();
  }, [searchEmployee]);

  const handleSelectChangeNameEmployee = (value) => {
    setSearchEmployee(`${value}`)
    const selectedEmployee = employeeData.find((employee) => employee.name === `${value}`);
    setEmployeeId(selectedEmployee ? selectedEmployee.id: 1);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setNote(value);
  };

  const handleImportMedicine = async () =>{
    const response = await axios.post(`http://localhost:9000/api/medicines/create-warehouse`, {
        employee_id: employeeId,
        discount_percent: 0,
        type: 0,
        discount_amount: 0,
        description : note,
        warehouse_session_request:  data
    });
    console.log(response);

  }

  const [form] = Form.useForm();

  const [medicineData, setMedicineData] = useState([]);

  const [searchMedicine, setSearchMedicine] = useState("");

  const [medicine_id, setMedicineId] = useState();

  const [expiry_date, setExpiryDate] = useState();

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
      dataIndex: 'unit',
      editable: true,
      width: 100,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expiry_date',
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
    const { name, unit } = values;
    const newProduct = {
      name,
      medicine_id,
      quantity,
      unit,
      expiry_date,
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
    <>
      <Button className="btn btn-import" type="primary" onClick={() => setOpen(true)}>
        Nhập kho
      </Button>
      <Modal
            title="Phiếu nhập kho"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            >
               <div className='import-warehouse-container'>
                  <div className='btn-add-drug'>
                        <Button onClick={handleImportMedicine} className="btn btn-import" type="primary" >
                            Thêm phiếu 
                        </Button>
                  </div>
                  <div className='search-container'>
                    
                        <div style={{width:'38%'}} >
                           <label style={{marginBottom:'5px'}}>Tên nhân viên</label>
                           <Select onChange={handleSelectChangeNameEmployee} style={{width:"320px" , height:"36px"}} placeholder="Tên nhân viên" showSearch className='input name' >
                           {employeeData.map(option => (
                                <option key={option.id} value={option.name}>
                                  {option.name}
                                </option>
                            ))}
                           </Select>
                           {/* <Input className='input note'></Input> */}
                        </div>
                        <div style={{width:'60%',marginLeft:'2%'}} >
                           <label style={{marginBottom:'5px'}}>Ghi chú</label>
                           <Input placeholder="Ghi chú"  onChange={handleInputChange} className='input note'></Input>
                        </div>
                      </div>
                   
                      <div className='table-container'>
                            <div className='' style={{marginBottom: 16}}>
                              
                                
                            </div>
                            <h5>Thêm thông tin thuốc</h5>
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
                    <Form.Item name="unit"  style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }]}>
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
                              </div>
               </div>
      </Modal>
    </>
  );
};


export default ImportWarehouse;
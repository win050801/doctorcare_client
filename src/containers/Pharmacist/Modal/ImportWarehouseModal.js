import React, { useState,useEffect, useContext } from 'react';
import { Button, Input, Modal,Table,Select, Form, DatePicker, Popconfirm, message,Typography } from 'antd';
import './ImportWarehouseModal.scss'
import { Link } from 'react-router-dom';
import ImportTable from './ImportTable';
import axios from "axios";
import moment from 'moment';
import { AppContext } from "../Warehouse/AppContext";
const { Text } = Typography;

const ImportWarehouse = () =>{

  const { data, setData } = useContext(AppContext);

   const [open, setOpen] = useState(false);

   const [modalVisible, setModalVisible] = useState(false);

   const [searchEmployee, setSearchEmployee] = useState("");

   const [employeeData, setEmployeeData] = useState([]);

   const [employeeId, setEmployeeId] = useState([]);

   const [note, setNote] = useState("");

   const [isEditing, setIsEditing] = useState(false);

   const [editingIndex, setEditingIndex] = useState(-1);

   const [storageUnit, setStorageUnit] = useState("");

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

  const handleImportMedicine = (event) => {
    event.preventDefault();
    setModalVisible(true);
  };
  
  const handleConfirm = async () =>{
    if(dataImport.length === 0){
      message.error('Bạn cần chọn thuốc để nhập kho');
      return;
    }
    if (!employeeId || !note) {
      message.error('Bạn phải chọn tên nhân viên và nhập ghi chú');
      return;
    }
    if (expiry_date === null || expiry_date === "" || expiry_date === undefined) {
      message.error('Vui lòng chọn ngày hết ');
      return;
    }
    if (manufacture_date === null || manufacture_date === "" || manufacture_date === undefined ) {
      message.error('Vui lòng chọn ngày sản xuất ');
      return;
    }
    const response = await axios.post('http://localhost:9000/api/medicines/create-warehouse', 
          {
            discount_percent: 0,
            type: 0,
            discount_amount: 0,
            description: note,
            expiry_date: expiry_date,
            manufacture_date: manufacture_date,
            warehouse_session_request:  dataImport
          },
          {
            headers: {
              'Authorization': `eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==`,
              'Content-Type': 'application/json'
          }
      }
    );
    
    message.success("Thêm phiếu nhập kho thành công");
    
    setModalVisible(false);
    const ids = dataImport.map(item => item.medicine_id);
    console.log(dataImport);
    console.log(ids); // In ra một mảng chứa các giá trị id
    const quantity = dataImport.map(item => item.quantity);
    console.log(quantity);

    updateQuantityByIds(dataImport.map(item => item.medicine_id), dataImport.map(item => item.quantity))
    console.log(data);
    setOpen(false);
    setDataImport([]);
    form.resetFields();
  }

  const updateQuantityByIds = (ids, quantities) => {
    const updatedMedicineData = data.map((medicine) => {
      if (ids.includes(medicine.id)) {
        const index = ids.indexOf(medicine.id);
        const quantity = parseFloat(quantities[index]);
        return {
          ...medicine,
          inventory: parseFloat(medicine.inventory + quantity),
        };
      }
      return medicine;
    });
  
    setData(updatedMedicineData);
  };
  
  

  const [form] = Form.useForm();

  const [medicineData, setMedicineData] = useState([]);

  const [searchMedicine, setSearchMedicine] = useState("");

  const [medicine_id, setMedicineId] = useState();

  const [expiry_date, setExpiryDate] = useState();

  const [reset, setReset] = useState(false);

  const [quantity, setQuantity] = useState(0);

  const [defaultValueDate, setDefaultValueDate] = useState(null);

  const [manufacture_date,setManufactureDate] = useState();

  const [costPrice,setCostPrice] = useState(0);

  const [dataImport, setDataImport] = useState([]);

  let [totalAmountSum,setTotalAmountSum] = useState(0);

  const [avatar, setAvatar] = useState("");


  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/`, {
            params:{
              category_id: -1,
              medicine_id: -1,
              key_search: searchMedicine,
              status: 1,
              sort_by: 0,
              limit:"",
              offset: ""
            }
        });
        setMedicineData(response.data.data.list);
      };
      fetchCategoryData();
  }, [searchMedicine]);

  const handleSelectChangeName = (value) => {
    setSearchMedicine(`${value}`)
    const selectedMedicine = medicineData.find((medicine) => medicine.name === `${value}`);
    setMedicineId(selectedMedicine ? selectedMedicine.id : -1);
    setCostPrice(selectedMedicine? selectedMedicine.cost_price : -1)
    setStorageUnit(selectedMedicine? selectedMedicine.storage_unit : "")
    setAvatar(selectedMedicine? selectedMedicine.avatar : "")
  }

  

  const onEdit = (record) => {
    setEditingIndex(record.key - 1);
    setIsEditing(true);
    form.setFieldsValue(record);
    const { expiry_date } = record;
    form.setFieldsValue({
      ...record,
      expiry_date: moment(expiry_date),
    });
  };

  const onDelete = (record) => {
    setDataImport(dataImport.filter((item) => item.key !== record.key));
  };

  const onSave = (values) => {
    const newData = [...dataImport];
    const index = newData.findIndex((item) => values.key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...values });
      setDataImport(newData);
      form.resetFields();
    } else {
      newData.push(values);
      setDataImport(newData);
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
      title: 'Hình ảnh',
      dataIndex: 'avatar',
      width: "12%",
      key: 'avatar',
      render: (avatar) => (
        <td className="img-cell">
          <img src={avatar} alt="Hình ảnh" style={{ width: '100px' }} />
        </td>
      ),
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
  
    },
    {
      title: 'Đơn giá',
      dataIndex: 'costPriceFormatted',
      editable: true,
     
    },
    {
      title: 'Hành động',
      dataIndex: 'operation',
      render: (_, record) =>
        dataImport.length >= 1 ? (
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
    {
      title: 'Thành tiền',
      dataIndex: 'totalAmountFormatted',
      editable: true,
      width: 100,
    },
  ];

  const costPriceFormatted = parseFloat(costPrice).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const onFinish = (values) => {
    const { name, unit } = values;
    const newProduct = {
      name,
      medicine_id,
      quantity,
      unit,
      costPrice,
      avatar,
      totalAmount: parseFloat(quantity) * parseFloat(costPrice),
      costPriceFormatted,
      totalAmountFormatted: (parseFloat(quantity) * parseFloat(costPrice)).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    };
  
    if (isEditing) {
      // Cập nhật thông tin sản phẩm đã có trong danh sách
      const updatedProduct = { ...newProduct, key: editingIndex + 1 };
      setDataImport([
        ...dataImport.slice(0, editingIndex),
        updatedProduct,
        ...dataImport.slice(editingIndex + 1),
      ]);
      setIsEditing(false);
    } else {
      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
      const existingProductIndex = dataImport.findIndex((product) => product.name === name);
  
      if (existingProductIndex !== -1) {
        // Sản phẩm đã tồn tại trong danh sách, cộng thêm quantity cho sản phẩm này
        const existingProduct = dataImport[existingProductIndex];
        const updatedProduct = {
          ...existingProduct,
          quantity: parseFloat(parseFloat(existingProduct.quantity) + parseFloat(quantity)),
          totalAmount: parseFloat(existingProduct.totalAmount) + parseFloat(newProduct.totalAmount),
          totalAmountFormatted: parseFloat(costPrice).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        };
        setDataImport([
          ...dataImport.slice(0, existingProductIndex),
          updatedProduct,
          ...dataImport.slice(existingProductIndex + 1),
        ]);
      } else {
        // Sản phẩm chưa tồn tại trong danh sách, thêm sản phẩm mới vào danh sách
        setDataImport([...dataImport, { ...newProduct, key: dataImport.length + 1 }]);
      }
    }

    setSearchMedicine("");
    form.resetFields();
  };

  useEffect(() => {
    // Tính tổng totalAmount của tất cả các sản phẩm trong dataImport
    const sum = dataImport.reduce((accumulator, product) => accumulator + product.totalAmount, 0);
    setTotalAmountSum(sum);
  }, [dataImport])
  
  const checkQuantity = (_, value) => {
    if (value <= 0) {
      return Promise.reject("Lớn hơn 0");
    } else {
      return Promise.resolve();
    }
  };


  const handleSelectChangeExpiryDate = (date, dateString) => {
      setExpiryDate(dateString);  
  }

  const handleSelectChangeManufactureDate = (date, dateString) =>{
      setManufactureDate(dateString);
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
  const disabledDate = (current) => {
    const today = moment().startOf('day');
    // Nếu ngày được chọn nhỏ hơn hoặc bằng ngày hiện tại, disable nó
    return current && current <= today;
  }

  const disabledManufactureDate = (current) => {
    const today = moment().startOf('day');
    // Nếu ngày được chọn nhỏ hơn hoặc bằng ngày hiện tại, disable nó
    return current && current > today;
  }

  const handleDropdownVisibleChange = (open) => {
    if (!open) {
      setSearchMedicine("");
      
    }
  }

  return (
    <>
      <Button className="btn btn-import" type="primary" onClick={() => setOpen(true)}>
        Nhập kho
      </Button>
      <Modal
                          title="Xác nhận cập nhật thông tin"
                          visible={modalVisible}
                          onOk={handleConfirm}
                          onCancel={() => setModalVisible(false)}
                        >
                          <p>Xác nhận thêm phiếu nhập kho?</p>
      </Modal>

      <Modal
            title="Phiếu nhập kho"
            centered
            open={open}
            closable={true}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps  ={{ style: { display: 'none' } }}
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
                    
                        <div style={{width:'30%'}} >
                           <label style={{marginBottom:'5px'}}>Tên nhân viên</label>
                           <Select onChange={handleSelectChangeNameEmployee} style={{width:"200px" , height:"36px"}} placeholder="Tên nhân viên" showSearch className='input name' >
                           {employeeData.map(option => (
                                <option key={option.id} value={option.name}>
                                  {option.name}
                                </option>
                            ))}
                           </Select>
                           {/* <Input className='input note'></Input> */}
                        </div>
                        <div style={{width:'40%',marginLeft:'2%'}} >
                           <label style={{marginBottom:'5px'}}>Ngày sản xuất</label>
                           <DatePicker disabledDate= {disabledManufactureDate} onChange={handleSelectChangeManufactureDate}  style={{width:"200px", height:"36px",marginTop:"5px"}}/>
                        </div>
                        <div style={{width:'40%',marginLeft:'2%'}} >
                           <label style={{marginBottom:'5px'}}>Ngày hết hạn</label>
                           <DatePicker disabledDate= {disabledDate} onChange={handleSelectChangeExpiryDate}  style={{width:"200px", height:"36px",marginTop:"5px"}}/>
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
                      <Select onDropdownVisibleChange={handleDropdownVisibleChange} allowClear onChange={handleSelectChangeName} placeholder= "Tên thuốc"  showSearch className='input name' >
                          {medicineData.map(option => (
                              <option key={option.id} value={option.name}>
                                {option.name}
                              </option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item name="quantity" style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }, { validator: checkQuantity }]}>
                      <Input type="number" min={0}  name ="quantity" onChange={handleChangeQuantity} placeholder="Số lượng" />
                    </Form.Item>
                    {/* <Form.Item name="unit"  style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }]}> */}
                      <Input style={{ height:"32px", width:'15%',marginLeft:'2%', marginTop:"5px"}} placeholder="Đơn vị" value={storageUnit}  readOnly/>
                    {/* </Form.Item> */}
                    {/* <Form.Item  name="expiryDate"  style={{ width:'15%',marginLeft:'2%', marginTop:"5px"}} rules={[{ required: true }]}> */}
                      {/* <DatePicker value={expiry_date} onChange={handleSelectChangeExpiryDate}  style={{ height:"32px",width:'15%',marginLeft:'2%', marginTop:"5px"}} placeholder="Hạn sử dụng" > </DatePicker> */}
                      {/* <Input placeholder="Hạn sử dụng" /> */}
                      {/* <DatePicker disabledDate= {disabledDate} onChange={handleSelectChangeExpiryDate} style={{ height:"32px", width:'15%', marginLeft:'2%', marginTop:"5px"}} placeholder="Hạn sử dụng"/> */}

                    {/* </Form.Item> */}
                    <Button onClick={handleReset}  style={{ width:'15%',marginLeft:'5%', marginTop:"5px"}} type="primary" htmlType="submit">
                      Thêm thuốc
                    </Button>
                  
                  </Form>
                  <br />
                  <Table
                    bordered
                    dataSource={dataImport}
                    columns={columns}
                    pagination={false}
                  />
                  <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Text strong>Tổng tiền:</Text>{' '}
                    <Text>{totalAmountSum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                  </div>
                 
                </div>
                              </div>
               </div>
      </Modal>
    </>
  );
};


export default ImportWarehouse;
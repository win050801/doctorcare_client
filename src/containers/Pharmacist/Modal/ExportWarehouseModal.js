
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Table, Input, Button, Popconfirm, Form ,Modal, Select, message,Typography, Spin, Empty} from 'antd';
import './ImportWarehouseModal.scss';
import './ExportWarehouseModal.scss';
import axios from 'axios';
import { LanguageVariant } from 'typescript';
import { Link } from 'react-router-dom';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { AppContext } from "../Warehouse/AppContext";
import { log } from '@antv/g2plot/lib/utils';
import LoadingSpinner from '../../LoadingSpin/LoadingSpiner';

const { Text } = Typography;



const ExportWarehouse = () =>{

  const [isLoading, setIsLoading] = useState(false);

  let [totalAmountSum,setTotalAmountSum] = useState(0);

  const { data, setData } = useContext(AppContext);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });

  const [modalVisible, setModalVisible] = useState(false);

  const [isDiscountAmount, setIsDiscountAmount] = useState(false);

  const [isDiscountPercent, setIsDiscountPercent] = useState(false);

  const [medicineData, setMedicineData] = useState([]);

  const [searchMedicine, setSearchMedicine] = useState("");

  const [medicine_id, setMedicineId] = useState(0);

  const [quantity, setQuantity] = useState(0);

  const [editingIndex, setEditingIndex] = useState(-1);

  const [isEditing, setIsEditing] = useState(false);

  const [retailPrice, setRetailPrice] = useState(0);

  const [employeeId, setEmployeeId] = useState([]);

  const [note, setNote] = useState("");

  const [discountPercent, setDiscountPercent] = useState(0);

  const [discountAmount, setDiscountAmount] = useState(0);

  const [storageUnit, setStorageUnit] = useState("");
  
  const [avatar, setAvatar] = useState("");

  const [checkQuantityM, setCheckQuantityM] = useState(false);

  const [previousQuantity, setPreviousQuantity] = useState(0);

  const [discountAmountVND, setDiscountAmountVND] = useState('');

  

  useEffect(() => {
    const check = async () => {
      if (quantity !== previousQuantity) {
        const medicine = medicineData.find((medicine) => medicine.id === medicine_id);
        const currentId = medicine ? medicine.id : 0;
        const currentInventory = medicine ? medicine.inventory : 0;
        const response = await axios.get('http://localhost:9000/api/orders/check-quantity', {
          params: {
            medicine_id: currentId,
            quantity: parseFloat(quantity)
          }
        });
        console.log(response);
        if (response.data.status === 400) {
          message.error(`Số lượng không đủ, số lượng còn lại: ${currentInventory}`);
          setCheckQuantityM(false);
          return;
        }
        setPreviousQuantity(quantity);
        setCheckQuantityM(true);
      }
    };
  
    check();
  }, [quantity]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/inventory/medicines`, {
            params:{
              category_id: -1,
              medicine_id: -1,
              key_search: searchMedicine,
              is_expiry: 0,
              status: 1,
              sort_by: 0,
              limit:100,
              offset:0
            }
        });
        console.log(response);
        setMedicineData(response.data.data.list);
      };
      fetchCategoryData();
  }, [searchMedicine]);


  const handleSelectChangeName = (value) => {
    setSearchMedicine(`${value}`)
    const selectedMedicine = medicineData.find((medicine) => medicine.name === `${value}`);
    setMedicineId(selectedMedicine ? selectedMedicine.id : -1);
    setRetailPrice(selectedMedicine? selectedMedicine.retail_price : -1)
    setStorageUnit(selectedMedicine? selectedMedicine.storage_unit : "")
    setAvatar(selectedMedicine? selectedMedicine.avatar : "")
  }

  const handleDiscountAmountChange = (event) => {
      const target = event.target;
      const value = target.value
      const isDiscountAmount = event.target.value;
      setIsDiscountAmount(isDiscountAmount !== '');
      setDiscountAmount(value);
      const sanitizedValue = value.replace(/[^0-9.,]/g, '');
      const numericValue = parseFloat(sanitizedValue.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        // Định dạng giá trị thành tiền Việt Nam
        const formattedValue = numericValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        setDiscountAmountVND(formattedValue);
        console.log(discountAmountVND);
        // Cập nhật giá trị định dạng vào state hoặc làm các xử lý khác tại đây
        // Ví dụ: setState(formattedValue);
      }
      if (value === '') {
        setIsDiscountPercent(false);
      }
  };

  const handleDiscountPercentChange = (event) => {
    const target = event.target;
    const value = target.value;
    const isDiscountPercent = event.target.value;
    setIsDiscountPercent(isDiscountPercent !== '');
    setDiscountPercent(value);
    if (value === '') {
      setIsDiscountAmount(false);
    }
  }

  // const handleChange = (page, pageSize) => {
  //   setPagination({ current: page, pageSize });
  // };

  const handleChange = (pagination, filters, sorter) => {
    // Lấy ra số trang hiện tại
    // const currentPage = pagination.current;
    // setPage(currentPage);
    setPagination({ current: pagination.current, pageSize:5 });
    // ...
  };
  
  const [open, setOpen] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'test',
      onAfterPrint: () => alert('Print success')
  })

  const [form] = Form.useForm();
  const [dataExport, setDataExport] = useState([]);

  const onEdit = (record) => {
    setEditingIndex(record.key - 1);
    setIsEditing(true);
    form.setFieldsValue(record);
   
  };

  const onDelete = (record) => {
    setDataExport(dataExport.filter((item) => item.key !== record.key));
  };

  const onSave = (values) => {
    const newData = [...dataExport];
    const index = newData.findIndex((item) => values.key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...values });
      setDataExport(newData);
      form.resetFields();
    } else {
      newData.push(values);
      setDataExport(newData);

      form.resetFields();
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      editable: true,
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
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      editable: true,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'retailPriceFormatted',

      editable: true,
    },
    
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) =>
        dataExport.length >= 1 ? (
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
    },
  ];

  const retailPriceFormatted = parseFloat(retailPrice).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  
  

  const onFinish = (values) => {
    console.log(checkQuantityM);
    if(checkQuantityM === false){
      return message.error(`Số lượng không đủ`);
    }
    const { name, unit } = values;
    const newProduct = {
      name,
      medicine_id,
      quantity,
      unit,
      avatar,
      retailPrice,
      totalAmount: parseFloat(quantity) * parseFloat(retailPrice),
      retailPriceFormatted,
      totalAmountFormatted: (parseFloat(quantity) * parseFloat(retailPrice)).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })
    };
  
    if (isEditing) {
      // Cập nhật thông tin sản phẩm đã có trong danh sách
      const updatedProduct = { ...newProduct, key: editingIndex + 1 };
      setDataExport([
        ...dataExport.slice(0, editingIndex),
        updatedProduct,
        ...dataExport.slice(editingIndex + 1),
      ]);
      setIsEditing(false);
    } else {
      // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
      const existingProductIndex = dataExport.findIndex((product) => product.name === name);
  
      if (existingProductIndex !== -1) {
        // Sản phẩm đã tồn tại trong danh sách, cộng thêm quantity cho sản phẩm này
        const existingProduct = dataExport[existingProductIndex];
        const updatedProduct = {
          ...existingProduct,
          quantity: parseFloat(parseFloat(existingProduct.quantity) + parseFloat(quantity)),
          totalAmount: parseFloat(existingProduct.totalAmount) + parseFloat(newProduct.totalAmount),
          totalAmountFormatted: parseFloat(retailPrice).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        };
        setDataExport([
          ...dataExport.slice(0, existingProductIndex),
          updatedProduct,
          ...dataExport.slice(existingProductIndex + 1),
        ]);
      } else {
        // Sản phẩm chưa tồn tại trong danh sách, thêm sản phẩm mới vào danh sách
        setDataExport([...dataExport, { ...newProduct, key: dataExport.length + 1 }]);
      }
    }
  
    setSearchMedicine("");
    form.resetFields(['quantity','name','unit']);
  };


  const handleChangeQuantity = async (event) => {
    const target = event.target;
    const value = target.value;
    setQuantity(value);
  };

  useEffect(() => {
    // Tính tổng totalAmount của tất cả các sản phẩm trong dataExport
    const sum = dataExport.reduce((accumulator, product) => accumulator + product.totalAmount, 0);
    let total = 0;
    if (discountPercent === 0 && discountAmount === 0) {
      total = sum;
    } else if (discountPercent === 0) {
      if(discountAmount > sum){
        message.error("Số tiền giảm giá không được vượt số tiền thanh toán");
        return;
      }else{
        total = sum - discountAmount;
      }
      
    } else {
      total = sum - (sum * (discountPercent / 100));
    }
    setTotalAmountSum(total);

  }, [dataExport, discountAmount, discountPercent])


  const checkDiscountPercent = (_, value) =>{
    if (value < 0 && value > 100) {
      return Promise.reject("Phần trăm giảm giá lớn hơn 0 và bé hơn 100");
    } else {
      return Promise.resolve();
    }
  }

  const handleConfirm = async () => {
      setModalVisible(false);

      if(dataExport.length === 0){
        message.error('Bạn cần chọn thuốc để xuất kho');
        return;
      }
      if (!employeeId) {
        message.error('Bạn cần chọn tên nhân viên phụ trách xuất kho');
        return;
      }
      if(checkQuantityM === false){
        return;
      }
      // if(!checkQuantity){
      //   return;
      // }
      setIsLoading(true);
      try {
        const response = await axios.post(`http://localhost:9000/api/orders/create-medicines`, {
          employee_id: 1,
          discount_percent: discountPercent,
          type: 1,
          discount_amount: discountAmount,
          description : note,
          warehouse_session_request:  dataExport
      },
      {
        headers: {
          Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
          'Content-Type': 'application/json',
        }
    }
      );
      message.success('Thêm phiếu xuất kho thành công');
      setIsLoading(false);
      setDiscountAmount(0);
      setDiscountPercent(0);
      updateQuantityByIds(dataExport.map(item => item.medicine_id), dataExport.map(item => item.quantity))
      setDataExport([]);
      form.resetFields();
      } catch (error) {
          setIsLoading(false);
      }
     
  }


  const updateQuantityByIds = (ids, quantities) => {
    const updatedMedicineData = data.map((medicine) => {
      if (ids.includes(medicine.id)) {
        const index = ids.indexOf(medicine.id);
        const quantity = parseFloat(quantities[index]);
        return {
          ...medicine,
          inventory: parseFloat(medicine.inventory - quantity),
        };
      }
      return medicine;
    });
  
    setData(updatedMedicineData);
  };

  // const handleExportMedicine = async () =>{
    const handleExportMedicine = (event) => {
      event.preventDefault();
      setModalVisible(true);
    };
  // }

  const handleDropdownVisibleChange = (open) => {
    if (!open) {
      setSearchMedicine("");
    }
  }


  return (
    <>
      <Button className="btn btn-import" type="primary" onClick={() => setOpen(true)}>
        Xuất kho
      </Button>
      <Modal
                          title="Xác nhận cập nhật thông tin"
                          visible={modalVisible}
                          onOk={handleConfirm}
                          onCancel={() => setModalVisible(false)}
                        >
                          <p>Xác nhận cập nhật thông tin?</p>
        </Modal>
      <Modal
            title="Phiếu xuất kho"

            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={
              <div>
                <Button >Thoát</Button>         
                <Button onClick={handlePrint}>Lưu và in</Button>
               
                <Button onClick={handleExportMedicine}  >Thêm phiếu xuất</Button>
              </div>
            }
            >
              <Form   form={form} onFinish={onFinish}>
               <div className='export-warehouse-container'>
                  <div style={{height:'50%', width:'55%',display:'flex', alignItems:'center'}}>
                     <div className='info-info-detail' >
                           <h5>Thông tin khách hàng</h5>
                      
                           <div className='customer customer-name'>
                              <div className='number-1-name'>
                                 <label className='label customer-name'>Tên khách hàng</label>

                                 <Form.Item name="customer-name" >
                                    <Input className='input customer-name' placeholder= 'Tên khách hàng'></Input>
                                 </Form.Item>
                                
                              </div>
                              <div className='number-1-birth-year'>
                                 <label className='label birth-year' >Năm sinh</label>
                                

                                 <Form.Item name="birth-year" >
                                    <Input className='input birth-year' placeholder= 'Năm sinh' ></Input>
                                  </Form.Item>
                              </div>
                           </div>
                           <div className='customer customer-info'>
                              <div className='number-2-address'>
                                 <label className='label address'>Địa chỉ</label>
                                 <Input className='input address' placeholder= 'Địa chỉ'></Input>
                              </div>
                              <div className='number-2-phone '>
                                 <label className='label phone'>Số điện thoại</label>
                                 <Input className='input phone' placeholder= 'Số điện thoại'></Input>
                              </div>
                           </div>
                           <div className='customer customer-info'>
                             
                              <div className='number-3-percent-discount'>
                                 <label className='label percent-discount'>Giảm giá(%)</label>
                                 <Form.Item name= "discountPercent" rules={[ { validator: checkDiscountPercent}]}>                                 
                                    <Input name= "discountPercent" type="number" min={0} max={100} placeholder= 'Phần trăm giảm giá' onChange={handleDiscountPercentChange} disabled={isDiscountAmount}  className='input percent-discount' style ={{width:"200px"}}></Input>
                                 </Form.Item>
                              </div>
                              <div className='number-3-amount-discount'>
                                 <label className='label amount-discount'>Giảm giá(VND)</label>
                                 <Form.Item name ="discountAmount" >
                                    <Input type="number" min={0} max={100000000} name="discountAmount" placeholder="Số tiền giảm giá" onChange={handleDiscountAmountChange} disabled={isDiscountPercent} className="input amount-discount" style={{ width: "271px" }} />
                                  </Form.Item>

                              </div>
                           </div>
                           <div className='customer customer-info'>
                              <div className='number-4-note'>
                                 <label className='label note'>Ghi chú</label>                          
                                 <Form.Item name="note" >
                                    <Input placeholder= 'Ghi chú' className='input note'></Input>
                                  </Form.Item>
                              </div>
                           </div>
                          

                     </div>
                     
                  </div>
                  
                     <div className='input-drug'>
                                 <div>                          
                                       <div style={{display: 'flex',alignItems: 'center'}}>
                                          <h5>Thêm thuốc xuất kho</h5>
                                          <Button type="primary" htmlType="submit" style={{marginLeft:'24%',height:'36px',width:'150px'}}>
                                             Thêm thuốc
                                          </Button>
                                       </div>
                                       <div style={{alignItems:'center',flex:'row', marginTop:"50px"}}>
                                          <Form.Item name="name" rules={[{ required: true }]}>
                                            <Select onDropdownVisibleChange={handleDropdownVisibleChange} allowClear onChange={handleSelectChangeName} placeholder= "Tên thuốc"  showSearch className='input name' >
                                                {medicineData.map(option => (
                                                    <option key={option.id} value={option.name}>
                                                      {option.name}
                                                    </option>
                                                ))}
                                            </Select>
                                          </Form.Item>
                                          <Form.Item name="quantity" rules={[{ required: true, message:"Bắt buộc nhập" } ]}>
                                             <Input type="number" min={0}  name ="quantity" onChange={handleChangeQuantity} className='input' placeholder="Số lượng" />
                                          </Form.Item>
                                          <Input style={{ height:"32px", width:'100%',marginLeft:'0%', marginTop:"5px"}} placeholder="Đơn vị" value={storageUnit}  readOnly/>

                                       </div>
                                    

                                 </div>
                              
                     </div>
                  
                  
               </div>
               </Form> 
               <div  className='table-container'>
                  
                    <Table
                        locale={{
                          emptyText: <Empty description="Không có dữ liệu" />,
                        }}
                        ref= {componentRef}
                        bordered
                        dataSource={dataExport}
                        columns={columns}
                        pagination={pagination}
                        onChange={handleChange}
                    />
                    <div style={{ marginTop: 16, textAlign: 'right' }}>
                      <Text strong>Tổng tiền:</Text>{' '}
                      <Text>{totalAmountSum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                  </div>
              </div>
      </Modal>
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};


export default ExportWarehouse;
import React, { Component,useEffect,useState } from "react";

import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { Input, Table, Button,Select ,Form, Space,DatePicker,message   } from 'antd';


import { connect } from "react-redux";
import './Warehouse.scss'
import ImportWarehouseModal from "../Modal/ImportWarehouseModal";
import ExportWarehouseModal from "../Modal/ExportWarehouseModal";
import { getMedicines } from "../../../routes/APIRoutes/APIMedicine";
import axios from "../../../axios";
import { useHistory } from 'react-router-dom';



function MyVerticallyCenteredModal(props) {

  const [form] = Form.useForm();

  const [categoryData,setCategoryData] = useState([]);

  const [formValues, setFormValues] = useState({});

  const [expiryDate, setExpiryDate] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [categoryId, setCategoryId] = useState(1);

  const checkQuantity = (_, value) => {
    if (value <= 0) {
      return Promise.reject("Lớn hơn 0");
    } else {
      return Promise.resolve();
    }
  };

  const renderQuantityError = () => {
    return (
      <div>
        <span>Số lượng phải lớn hơn 0</span>
      </div>
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDatePickerChange = (date, dateString) => {
    setExpiryDate(dateString);
  };

  const handleBlur = (event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      message.error('Vui lòng nhập số!');
    } 
  };

  const handleSelectChange = (value) => {
    setCategoryId(`${value}`)
  }



  useEffect(() => {
    const fetchMedicineData = async () => {
      const response = await axios.get(`http://localhost:9000/api/categories/`, {});
      setCategoryData(response.data);
    };
    fetchMedicineData();
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const response = await axios.post(`http://localhost:9000/api/medicines/create`, {
        category_id: categoryId,
        name: formValues.name,
        expiry_date: expiryDate,
        out_stock_alert_quantity: formValues.out_stock_alert_quantity,
        retail_price: formValues.retail_price,
        cost_price: formValues.cost_price,
        storage_unit: formValues.storage_unit,
        original_name: formValues.original_name,
        out_expiry_date_alert: formValues.out_expiry_date_alert,
        note: formValues.note,
        method_of_use: formValues.method_of_use
    }).catch(error => console.error(error));;
  };

  return (
    <Modal
    {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form form={form} onFinish={handleSubmit}>
   
        <div style={{display:"flex"}}>
          <h2 className="mb-4 text-2xl font-medium">Thêm thuốc</h2>
          <Form.Item style={{marginLeft: "30px"}} name="Danh mục thuốc" rules={[{ required: true }]}>

            <Select onChange={handleSelectChange} getPopupContainer={(trigger) => trigger.parentElement}  placeholder="Danh mục"  style={{ width: "160px"}}>
                {/* <option value="volvo">Nam</option>
                <option value="saab">Nữ</option> */}
                {categoryData.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </Select>
        </Form.Item>
        </div>
        
        
        <div className="row">
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="form-group">
              <label htmlFor="name" className="inputSearch">
                Tên thuốc
              </label>
              <Form.Item name="name" rules={[{ required: true }]}>
                  <Input name="name" onChange={handleInputChange} placeholder="Tên thuốc"></Input>
              </Form.Item>
              {/* <input type="text" className="form-control" id="name" /> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="form-group">
              <label htmlFor="genericName" className="inputSearch">
                Tên gốc
              </label>
              <Form.Item name="Tên gốc" rules={[{ required: true }]}>
                    <Input name="original_name" onChange={handleInputChange} placeholder="Tên gốc"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="form-group">
              <label htmlFor="storageUnit" className="inputSearch">
                Đơn vị lưu kho
              </label>
              <Form.Item name="Đơn vị lưu kho" rules={[{ required: true }]}>
                      <Input name= "storage_unit" onChange={handleInputChange} placeholder="Đơn vị lưu kho"></Input>
              </Form.Item>
            </div>
          </div>
        
        </div>

        <div className="row mb-4 justify-content-between">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="name" className="inputSearch">
                Đơn giá vốn
              </label>
              <Form.Item name="Đơn giá vốn" rules={[{ required: true } , { validator: checkQuantity }]}>
                    <Input type="number" min={0} name = "cost_price" onChange={handleInputChange} placeholder="Đơn giá vốn"></Input>
              </Form.Item>
              {/* <input type="text" className="form-control" id="name" /> */}
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="form-group">
              <label htmlFor="genericName" className="inputSearch">
                Đơn giá bán
              </label>
              <Form.Item name="Đơn giá bán" rules={[{ required: true } , { validator: checkQuantity }]}>
                <Input type="number" min={0} name ="retail_price" onChange={handleInputChange} onBlur={handleBlur} placeholder="Đơn giá bán"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="form-group">
              <label htmlFor="storageUnit" className="inputSearch">
                Phương thức sử dụng
              </label>
              <Form.Item name="Phương thức" rules={[{ required: true }]}>
                <Input name ="method_of_use" onChange={handleInputChange} onBlur={handleBlur} placeholder="Phương thức sử dụng"></Input>
              </Form.Item>
            </div>
          </div>
          
        </div>

        <div className="row mb-4 justify-content-between">
          <div className="col-lg-4">
            <div className="form-group">
              <label htmlFor="name" className="inputSearch">
                Thông báo khi SL tồn nhỏ hơn
              </label>
              <Form.Item name="Thông báo khi SL tồn nhỏ hơn" rules={[{ required: true } , { validator: checkQuantity }]}>
                <Input type="number" min={0} name = "out_stock_alert_quantity" onChange={handleInputChange} onBlur={handleBlur} placeholder="Số lượng tồn nhỏ hơn"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="form-group">
              <label htmlFor="genericName" className="inputSearch">
                Ngày hết hạn
              </label>
              <Form.Item name="Ngày hết hạn" rules={[{ required: true }]}>
                <DatePicker className="date-picker"  getPopupContainer={(trigger) => trigger.parentElement} name = "expiry_date"  onChange={handleDatePickerChange}  />
              </Form.Item>
              {/* <input type="text" className="form-control" id="genericName" /> */}
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="form-group">
              <label htmlFor="storageUnit" className="inputSearch">
                Thông báo số ngày sử dụng dưới
              </label>
              <Form.Item name="Thông báo số ngày sử dụng dưới" rules={[{ required: true } , { validator: checkQuantity },]}>
                <Input type="number" min={0} name = "out_expiry_date_alert" onChange={handleInputChange} onBlur={handleBlur}  getPopupContainer={(trigger) => trigger.parentElement} placeholder="Ngày sử dụng dưới"></Input>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="name" className="inputSearch">
                  Ghi chú
                </label>
                <Form.Item name="Ghi chú" rules={[{ required: true }]}>
                  <Input name ="note" onChange={handleInputChange} placeholder="Ghi chú" ></Input>
                </Form.Item>
              </div>
            </div>
        </div>
  
    <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{marginLeft:'77%',height:'36px',width:'150px'}}>
                                             Thêm thuốc
    </Button>
      </Form>
      
      </Modal.Body>
    
    </Modal>
  );
}

function  Warehouse(){

    const [modalShow, setModalShow] = React.useState(false);

    const [categoryData,setCategoryData] = useState([]);

    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]);

    const [categoryId, setCategoryId] = useState(-1);

    const [status, setStatus] = useState(-1);

    const [sortBy, setSortBy] = useState(0);

    const [search,setSearch] = useState({
      categoryId: -1,
      medicineId: -1,
      keySearch: "",
      status: 1,
      sortBy: 0
    });
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSearch({ ...search, [name]: value });
    };

    useEffect(() => {
      const fetchMedicineData = async () => {
        const response = await axios.get(`http://localhost:9000/api/categories/`, {});
        setCategoryData(response.data);
      };
      fetchMedicineData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:9000/api/medicines/", {
              params: {
                category_id: categoryId,
                medicine_id: search.medicineId,
                key_search: search.keySearch,
                status: search.status,
                sort_by: search.sortBy,
              }
          });
    
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [search]);
    
  

    const handleOpenModal = () => {
      setOpen(true);
    };
  
    const handleCloseModal = () => {
      setOpen(false);
    };

    

    const columns = [
      {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
      },
      {
        title: 'Tên thuốc',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Ngày hết hạn',
        dataIndex: 'expiry_date',
        key: 'expiry_date',
      },
      {
        title: 'Giá vốn',
        dataIndex: 'cost_price',
        key: 'cost_price',
      },
      {
        title: 'Giá bán',
        dataIndex: 'retail_price',
        key: 'retail_price',
      },
      {
        title: 'Đơn vị lưu kho',
        dataIndex: 'storage_unit',
        key: 'storage_unit',
      },
      {
        title: 'Tác vụ',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => {
          return(
            <span>
              <Link to={`/medicine/detail/${record.id}`}> 
                  <Button style={{backgroundColor:'#3c8dbc', color: 'white', fontSize: '15px'}}
                         
                  >
                    Chi tiết</Button>
              </Link>
              <Link to={`/medicine/${record.id}/history/`}> 
                  <Button style={{backgroundColor:'#00a65a', color: 'white', fontSize: '15px'}}>Lịch sử</Button>
              </Link>
              
              <Button style={{backgroundColor:'red', color: 'white', fontSize: '15px'}}>Xóa</Button>
            </span>
          );
        }
    
      },
    ];

    const handleSelectChangeCategory = (value) => {
      setCategoryId(`${value}`)
      setSearch({ ...search, categoryId: value });
    }

    const handleSelectChangeStatus = (value) => {
      setStatus(`${value}`)
      setSearch({ ...search, status: value });
    }

    const handleSelectChangeSortBy = (value) => {
      setSortBy(`${value}`)
      setSearch({ ...search, sortBy: value });
    }



  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

    return (
            <React.Fragment>
                <div className="warehouse-container">
                    <div className="warehouse-content">
                        <div className="title-warehouse">
                            <h3>Quản lý kho thuốc'</h3>
                        </div>
                        <div className="form-warehouse">
                            <div className="box-header">
                                <div className="btn-action justify-content-between">
                                  
                                    <Button className="btn btn-add" variant="info" onClick={() => setModalShow(true)}>
                                        Thêm thuốc mới
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                    <Link to="/medicine/warning">
                                      <Button className="btn btn-warning" variant="info" >
                                          Đang cảnh báo
                                      </Button>
                                    </Link>
                                    
                                    <Button className="btn btn-report" variant="info" >
                                        Lịch sử
                                    </Button>
                                    {/* <Button  onClick={() => setOpen(true)} className="btn btn-import" variant="info" >
                                        Nhập kho
                                    </Button> */}
                                    <ImportWarehouseModal/>
                                    {/* <Button className="btn btn-export" variant="info" >
                                        Xuất kho
                                    </Button> */}
                                    <ExportWarehouseModal/>
                                    
                                   
                                </div>
                            </div>
                            {/* body */}
                            <div className="box-body">
                                <div className="search-container">
                                        <div className="search-content">
                                            <div>
                                                <h5>Từ khóa </h5>
                                                <Input onChange={handleInputChange} name="keySearch" type="text" className="input-search key"placeholder="Tìm kiếm thuốc"></Input>
                                            </div>
                                            <div>
                                                <h5>Danh mục thuốc </h5>
                                                <Select onChange={handleSelectChangeCategory} name="categoryId"  className="input-search-type" id="cars"  placeholder="Tất cả">
                                                  {categoryData.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                      {option.name}
                                                    </option>
                                                  ))}
                                                </Select>
                                            </div>
                                            <div>
                                                <h5>Trạng thái </h5>
                                                <Select onChange={handleSelectChangeStatus} name="status" style={{width:"160px"}} className="input-search start" id="cars" placeholder="Tất cả">
                                                    <option value="-1">Tất cả</option>
                                                    <option value="1">Đang hoạt động</option>
                                                    <option value="0">Không còn sử dụng</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <h5>Sắp xếp theo </h5>
                                                <Select onChange={handleSelectChangeSortBy} name="sortBy"  className="input-search sort" id="cars" placeholder="Chọn">
                                                    <option value="0">Tất cả</option>
                                                    <option value="1">Tên thuốc (Tăng dần)</option>
                                                    <option value="2">Tên thuốc (giảm dần)</option>
                                                    <option value="3">Ngày nhập kho (tăng dần)</option>
                                                    <option value="4">Ngày nhập kho (giảm dần)</option>
                                                    <option value="5">Số lượng tồn (tăng dần)</option>
                                                    <option value="6">Số lượng tồn (giảm dần)</option>
                                                    <option value="7">Hạn sử dụng (tăng dần)</option>
                                                    <option value="8">Hạn sử dụng (giảm dần)</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <h5 className="text-hidden">a</h5>
                                                <Button className="btn-see" >Xem</Button>
                                            </div>
                                            
                                        </div>
                                        <div className="table-content">
                                            <Table responsive  dataSource={data} columns={columns}  >
                                                
                                            </Table>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                </div>
            </React.Fragment>
        );
   
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);

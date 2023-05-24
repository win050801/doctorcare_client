
import React, { Component,useEffect,useState, useRef, useContext } from "react";

import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { Input, Table, Button,Select ,Form, Space,DatePicker,message   } from 'antd';
import { connect } from "react-redux";
import './Warehouse.scss'
import ImportWarehouseModal from "../Modal/ImportWarehouseModal";
import ExportWarehouseModal from "../Modal/ExportWarehouseModal";
import CommonUtils from "../../../utils/CommonUtils";
import axios from "../../../axios";
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { AppContext } from "./AppContext";




function MyVerticallyCenteredModal(props) {

  const [form] = Form.useForm();

  const { data, setData } = useContext(AppContext);

  const [categoryData,setCategoryData] = useState([]);

  const [formValues, setFormValues] = useState({});

  const [expiryDate, setExpiryDate] = useState("2022-05-05");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [categoryId, setCategoryId] = useState(-1);

  const [totalPages, setTotalPages] = useState(1);

  const [previewImgUrl, setPreviewImgUrl] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [avatar, setAvatar] = useState('');

  const [unit, setUnit] = useState('');

  const [method, setMethod] = useState('');

  const checkQuantity = (_, value) => {
    if (value <= 0) {
      return Promise.reject("Lớn hơn 0");
    } else {
      return Promise.resolve();
    }
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
      return;
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
    // event.preventDefault();
    console.log(formValues);
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
        method_of_use: formValues.method_of_use,
        status: 1
    }).catch(error => console.error(error));
    if(response.status === 2){
      alert(response.message);
      return;
    }

    const formData = new FormData();
    formData.append('id', response.data[0].id);
    formData.append('avatar', avatar);
    const res = await axios.post('http://localhost:9000/api/medicines/upload-avatar', formData, {
        headers: {
          Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
          'Content-Type': 'multipart/form-data',
        }
    });

    // const lastItemId = 0;
    // if (Array.isArray(data) && data.length > 0) {
    //   const lastItem = data[data.length - 1];
    //   lastItemId = lastItem.stt;
    // }
    // console.log(lastItemId);
    
    const newRecord = {
      id: response.data[0].id,
      avatar: avatar,
      retail_price: formValues.retail_price,
      cost_price: formValues.cost_price,
      inventory: 0,
      inventory_quantity: 0,
      name: formValues.name,
      storage_unit: formValues.storage_unit,
      stt: 5,
    };
    message.success("Thêm thuốc thành công");
    setIsModalVisible(false);
    setPreviewImgUrl("");
    const updatedData = [...data, newRecord];
    setData(updatedData);
    console.log(data);
    form.resetFields();
  };

  const openPreviewImage = () =>{
    console.log(previewImgUrl);
    if(!previewImgUrl ) return;
      setIsOpen(true);
  }

  const handleOnChangeImage = async (event) => {
      const file = event.target.files[0];
      console.log(file);
      if(file){
        let base64 = await CommonUtils.getBast64(file);
        const objectUrl =  URL.createObjectURL(file);
        setPreviewImgUrl(objectUrl);
        setAvatar(base64)
      }
  };
  
  const handleOnChangeSelectUnit = (event) =>{
    setFormValues({ ...formValues, storage_unit: event.target.value });
  }

  const handleOnChangeSelectMethod = (event) =>{
    setFormValues({ ...formValues, method_of_use: event.target.value });
  }

  

  
  

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
        <Modal.Title style={{marginLeft:"45%"}} id="contained-modal-title-vcenter">
            Thêm thuốc
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <Form form={form} onFinish={handleSubmit}>
   
        <div className="container-create-medicine">
          <div style={{display:"flex"}}>
            {/* <label>Danh mục thuốc</label> */}
            <Form.Item style={{marginLeft:"5%"}} name="Danh mục thuốc" rules={[{ required: true , message:"Bạn cần chọn danh mục"}]}>


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
                              <input style={{marginLeft:"50%"}} id="previewImg" type="file" hidden 
                                  onChange={(event) => handleOnChangeImage(event)} />

                                <label style={{marginLeft:"40%"}} className='label-upload ' htmlFor='previewImg' >Tải ảnh <i className="fa-solid fa-upload"></i></label>
                                <div  className='preview-image'
                                  style={{
                                    backgroundImage: `url(${previewImgUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    marginLeft:"5%",
                                    marginTop:"5px"
                                  }}
                                  onClick={openPreviewImage}
                                >
                                  
                                </div>
                   
        </div>
        
        <div className="row">
          <div className="col-lg-5 col-md-6 mb-4">
            <div className="form-group">
              <label htmlFor="name" className="inputSearch">
                Tên thuốc
              </label>
              <Form.Item name="name" rules={[{ required: true ,message:"Bạn cần nhập tên thuốc"}]}>
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
              <Form.Item name="Tên gốc" rules={[{ required: true,message:"Bạn cần nhập tên gốc" }]}>
                    <Input name="original_name" onChange={handleInputChange} placeholder="Tên gốc"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="form-group">
              <label htmlFor="storageUnit" className="inputSearch">
                Đơn vị lưu kho
              </label>
              <Form.Item name="Đơn vị lưu kho" rules={[{ required: true,message:"Bạn cần nhập phương thức" }]} >
                        <select onChange={handleOnChangeSelectUnit}  name= "storage_unit"  style={{width:"200px" , height:"38px"}} placeholder="Tên nhân viên" showSearch className='form-control' >
                                  <option value="">- Chọn đơn vị -</option>
                                  <option value="Viên">Viên</option>
                                  <option value="Gói">Gói</option>
                                  <option value="Lọ">Lọ</option>
                                  <option value="Chai">Chai</option>
                                  <option value="Ống">Ống</option>
                                  <option value="Tuýt">Tuýt</option>
                                  <option value="Hộp">Hộp</option>
                                  <option value="Vĩ">Vĩ</option>
                           </select>
                      {/* <Input name= "storage_unit" onChange={handleInputChange} placeholder="Đơn vị lưu kho"></Input> */}
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
              <Form.Item name="Đơn giá vốn" rules={[{ required: true ,message:"Bạn cần nhập giá vốn" } , { validator: checkQuantity }]}>
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
              <Form.Item name="Đơn giá bán" rules={[{ required: true,message:"Bạn cần nhập giá bán" } , { validator: checkQuantity }]}>
                <Input type="number" min={0} name ="retail_price" onChange={handleInputChange} onBlur={handleBlur} placeholder="Đơn giá bán"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="form-group">
              <label htmlFor="storageUnit" className="inputSearch">
                Phương thức sử dụng
              </label>
              <Form.Item name="Phương thức" rules={[{ required: true,message:"Bạn cần nhập phương thức" }]} >
                {/* <Input name ="method_of_use" onChange={handleInputChange} onBlur={handleBlur} placeholder="Phương thức sử dụng"></Input> */}
                <select onChange={handleOnChangeSelectMethod} name= "storage_unit"  style={{width:"200px" , height:"38px"}} placeholder="Tên nhân viên" showSearch className='form-control' >
                                  <option value="">- Chọn phương thức -</option>
                                  <option value="Uống">Uống</option>
                                  <option value="Nhai">Nhai</option>
                                  <option value="Ngậm">Ngậm</option>
                                  <option value="Đặt âm đạo">Đặt âm đạo</option>
                                  <option value="Thoa">Thoa</option>
                                  <option value="Tiêm">Tiêm</option>
                                  <option value="Nhỏ">Nhỏ</option>
                                  <option value="Xịt">Xịt</option>
                </select>
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
              <Form.Item name="Thông báo khi SL tồn nhỏ hơn" rules={[{ required: true ,message:"Bạn cần nhập trường này" } , { validator: checkQuantity }]}>
                <Input type="number" min={0} name = "out_stock_alert_quantity" onChange={handleInputChange} onBlur={handleBlur} placeholder="Số lượng tồn nhỏ hơn"></Input>
              </Form.Item>
            </div>
          </div>
          <div className="col-lg-3 ">
            <div className="form-group">
              <label htmlFor="genericName" className="inputSearch">
                Ngày hết hạn
              </label>
              <Form.Item name="Ngày hết hạn">
                <DatePicker defaultValue={moment()} disabled ={true} className="date-picker"  getPopupContainer={(trigger) => trigger.parentElement} name = "expiry_date"  onChange={handleDatePickerChange}  />
              </Form.Item>
              {/* <input type="text" className="form-control" id="genericName" /> */}
            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="form-group">
              <label htmlFor="storageUnit" className="inputSearch">
                Thông báo số ngày sử dụng dưới
              </label>
              <Form.Item name="Thông báo số ngày sử dụng dưới" rules={[{ required: true ,message:"Bạn cần nhập trường này" } , { validator: checkQuantity },]}>
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
        {/* {
          isOpen === true && (
            <Lightbox
              mainSrc={previewImgUrl}
              onCloseRequest={() => setIsOpen(false)}
            />
          )
        } */}

  
    <Button  type="primary" htmlType="submit" style={{marginLeft:'77%',height:'36px',width:'150px'}}>
                                             Thêm thuốc
    </Button>
      </Form>
      
      </Modal.Body>
    
    </Modal>
  );
}

const  Warehouse = () =>{

    const { data, setData } = useContext(AppContext);

    const [modalShow, setModalShow] = React.useState(false);

    const [categoryData,setCategoryData] = useState([]);

    const [page, setPage]  = useState(1);

    const [limit, setLimit]  = useState(6);

    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false);

    const [categoryId, setCategoryId] = useState(-1);

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState(-1);

    const [sortBy, setSortBy] = useState(0);

    const [totalPage, setTotalPages] = useState(0);

    const [search,setSearch] = useState({
      categoryId: -1,
      medicineId: -1,
      keySearch: "",
      isExpiry: 0,
      status: 1,
      sortBy: 0
    });
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSearch({ ...search, [name]: value });
      
    };

    useEffect(() => {
      const fetchMedicineData = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:9000/api/categories/`, {});
        setCategoryData(response.data);
      };
      fetchMedicineData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:9000/api/medicines/inventory/medicines", {
            params: {
              category_id: categoryId,
              medicine_id: search.medicineId,
              key_search: search.keySearch,
              status: search.status,
              sort_by: search.sortBy,
              is_expiry: search.isExpiry,
              limit: limit,
              page: page
            }
          });
          const startIndex = (page - 1) * limit + 1;
          const medicineDataWithStt = response.data.list.map((medicine, index) => ({
            ...medicine,
            stt: startIndex + index
          }));
    
          setData(medicineDataWithStt);
          setTotal(response.data.total_record);
          const totalPages = Math.ceil(response.data.total_record / limit);
          if (page > totalPages) {
            setPage(totalPages);
          }
          // setTotalPages(totalPages);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [search, page, categoryId, limit]);
    
    
    
    
  

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
        width: "2%",
      },
      {
        title: 'Hình ảnh',
        dataIndex: 'avatar',
        key: 'name',
        render: (avatar) => (
          <td className="img-cell">
                    <img src={avatar} alt="Hình ảnh" style={{ width: '100px' }} />
          </td>
        ),
      },
      {
        title: 'Tên thuốc',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Giá vốn',
        dataIndex: 'cost_price',
        key: 'cost_price',
        width: "10%",
        render: (text) => {
          return (
            <span>
              {parseFloat(text).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          );
        },
      },
      {
        title: 'Giá vốn',
        dataIndex: 'retail_price',
        width: "10%",
        key: 'retail_price',
        render: (text) => {
          return (
            <span>
              {parseFloat(text).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          );
        },
      },
      {
        title: 'Số lượng tồn',
        dataIndex: 'inventory',
        key: 'storage_unit',
        width: "10%",
      },
      {
        title: 'Đơn vị lưu kho',
        dataIndex: 'storage_unit',
        key: 'storage_unit',
        width: "12%",

      },
      {
        title: 'Tác vụ',
        dataIndex: 'actions',
        width: "10%",
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
      console.log(search);
    }

    const handleSelectChangeSortBy = (value) => {
      setSortBy(`${value}`)
      setSearch({ ...search, sortBy: value });
    }

    const handleSelectChangeExpiry = (value) =>{
      setSearch({ ...search, isExpiry: value });
      console.log(search);
    }

    const handleTableChange = (pagination, filters, sorter) => {
      // Lấy ra số trang hiện tại
      // const currentPage = pagination.current;
      // console.log(pagination.current);
      // setPage(currentPage);
      const { current } = pagination; // Lấy giá trị trang hiện tại từ pagination
      setPage(current);
      // ...
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
                                    <Link to={`/medicine/history/`}> 
                                        <Button className="btn btn-report" variant="info" >
                                              Lịch sử
                                        </Button>
                                    </Link>
                                    
                                        

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
                                                   
                                                </Select>
                                            </div>
                                            <div>
                                                <h5 className="">Hết hạn</h5>
                                                <Select onChange={handleSelectChangeExpiry} name="isExpiry"  className="input-search isExpiry" id="cars" placeholder="Chọn">
                                                    <option value="0">Chưa hết hạn</option>
                                                    <option value="1">Đã hết hạn</option>
                                                    <option value="-1">Tất cả</option>
                                                    
                                                   
                                                </Select>

                                            </div>
                                            
                                        </div>
                                        <div className="table-content">                                               
                                          <Table
                                              responsive
                                              dataSource={data}
                                              columns={columns}
                                              pagination={{
                                                pageSize: limit,
                                                total: total,
                                                current: page,
                                              }}
                                              onChange={handleTableChange}
                                            />

                                           

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


import React, { Component,useState,useEffect } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineDetail.scss';
import { Input,DatePicker, message,Modal, Spin  } from 'antd';
import { Link, useParams } from 'react-router-dom';
// import axios from "../../../axios";
import axios from "axios";
import moment from "moment";
import CommonUtils from "../../../utils/CommonUtils";


function  MedicineDetail(){

  const [isLoading, setIsLoading] = useState(false);

  const [previewImgUrl, setPreviewImgUrl] = useState("");
  
  const [modalVisible, setModalVisible] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [avatar, setAvatar] = useState('');

  const [medicineData, setMedicineData] = useState({});

  const [expiryDate, setExpiryDate]= useState(moment(medicineData.expiry_date));

  const [categoryData,setCategoryData] = useState([]);

  const [categoryChoose,setCategoryChoose] = useState([]);

  const [status, setStatus] = useState();

  const [categoryId, setCategoryId] = useState(0);

  const [imageBuffer, setImageBuffer] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/categories/`, {
          params:{
            category_id: ""
          }
      });
      setCategoryData(response.data.data);
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axios.get(`http://localhost:9000/api/categories/`, {
          params:{
            category_id: id
          }
      });
      setCategoryChoose(categoryId);
      console.log(id);
    };
    fetchCategoryData();
  }, []);


  useEffect(() => {
    const fetchMedicineData = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/${id}`, {});
      setMedicineData(response.data.data);
      setStatus(response.data.data.status)
      setCategoryId(response.data.data.category_id)
      setImageBuffer(new Buffer(response.data.data.avatar,'base64').toString('binary'));
      setPreviewImgUrl(new Buffer(response.data.data.avatar,'base64').toString('binary'));
    };
    fetchMedicineData();
  }, [id]);

  const handleDateChange = (date, dateString) => {
    setExpiryDate(date);
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setMedicineData({
      ...medicineData,
      [name]: value,
    });
    console.log(medicineData);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const response = await axios.post(`http://localhost:9000/api/medicines/${id}/update`, {
  //         category_id: medicineData.category_id,
  //         avatar: medicineData.avatar,
  //         name: medicineData.name,
  //         expiry_date: medicineData.expiry_date,
  //         out_stock_alert_quantity: medicineData.out_stock_alert_quantity,
  //         retail_price: medicineData.retail_price,
  //         cost_price: medicineData.cost_price,
  //         status: medicineData.status,
  //         note : medicineData.note,
  //         storage_unit: medicineData.storage_unit,
  //         use_unit: medicineData.use_unit,
  //         method_of_use: medicineData.method_of_use,
  //         original_name: medicineData.original_name,
  //         out_expiry_date_alert: medicineData.out_expiry_date_alert
  //   });
    
  //   const formData = new FormData();
  //   formData.append('id', id);
  //   formData.append('avatar', avatar);
  //   const res = await axios.post('http://localhost:9000/api/medicines/upload-avatar', formData, {
  //       headers: {
  //         Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
  //         'Content-Type': 'multipart/form-data',
  //       }
  //   });

  //   message.success("Cập nhập thành công")
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalVisible(true);
  };
  

  const handleConfirm = async () => {
    setModalVisible(false);
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:9000/api/medicines/${id}/update`, {
          category_id: categoryId,
          avatar: medicineData.avatar,
          name: medicineData.name,
          expiry_date: medicineData.expiry_date,
          out_stock_alert_quantity: medicineData.out_stock_alert_quantity,
          retail_price: medicineData.retail_price,
          cost_price: medicineData.cost_price,
          status: status,
          note : medicineData.note,
          storage_unit: medicineData.storage_unit,
          use_unit: medicineData.use_unit,
          method_of_use: medicineData.method_of_use,
          original_name: medicineData.original_name,
          out_expiry_date_alert: medicineData.out_expiry_date_alert
    });
    if(response.data.status === 2){
        message.error(response.data.message);
        setIsLoading(false);
        return;
    }
    const formData = new FormData();
    formData.append('id', id);
    formData.append('avatar', avatar === "" ? previewImgUrl : avatar);
    const res = await axios.post('http://localhost:9000/api/medicines/upload-avatar', formData, {
        headers: {
          Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
          'Content-Type': 'multipart/form-data',
        }
    });
      setIsLoading(false);
      message.success('Cập nhật thành công');
    } catch (error) {  
      message.error('Có lỗi xảy ra');
    }
  };
  

  const handleSelectChangeStatus = (event) =>{
      setStatus(event.target.value)
      setMedicineData({ ...medicineData, status: event.target.value });
  }

  const handleSelectChangeCategory = (event) => {
    setCategoryId(event.target.value);
    setMedicineData({ ...medicineData, category_id: event.target.value });
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

  const openPreviewImage = () =>{
    console.log(previewImgUrl);
    if(!previewImgUrl ) return;
      setIsOpen(true);
  }

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const handleOnChangeSelectUnit = (event) =>{
    setMedicineData({ ...medicineData, storage_unit: event.target.value });
  }

  const handleOnChangeSelectMethodOfUse = (event) =>{
    setMedicineData({ ...medicineData, method_of_use: event.target.value });
  }


   return (
           <React.Fragment>
            <div style={{ display: 'flex' }}>
                    <Navbar/>
                    <Modal
                          title="Xác nhận cập nhật thông tin"
                          visible={modalVisible}
                          onOk={handleConfirm}
                          onCancel={() => setModalVisible(false)}
                        >
                          <p>Xác nhận cập nhật thông tin?</p>
                    </Modal>
                    <div className="medicine-detail">
                      <div className="medicine-detail-container">
                      <form className="form-medicine-detail">
                          <h2 className="mb-4 text-2xl font-medium">Chi tiết thuốc</h2>
                          <div className="">
                                <input id="previewImg" type="file" hidden 
                                  onChange={(event) => handleOnChangeImage(event)} />

                                <label className='label-upload ' htmlFor='previewImg' >Tải ảnh <i className="fa-solid fa-upload"></i></label>
                                <div className='preview-image'
                                  style={{
                                    backgroundImage: `url(${previewImgUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                  }}
                                  onClick={openPreviewImage}
                                >
                                  
                                </div>
                          </div>
                          
                          
                          <div className="row">
                            <div className="col-lg-2 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Danh mục thuốc
                                </label>
                                {/* <Select className="form-control">
      
                                </Select> */}
                                <select style={{width:"200px" , height:"38px"}} onChange={handleSelectChangeCategory} value={categoryId} defaultValue={categoryChoose.name}  name=""  className="form-control" id="cars"  placeholder="Tất cả">
                                                  {categoryData.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                      {option.name}
                                                    </option>
                                                  ))}
                                </select>
                                {/* <Input type="text" className="form-control" id="name" placeholder="Tên thuốc" value={medicineData.name} onChange={handleInputChange}/> */}
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">

                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Tên thuốc
                                </label>
                                <Input type="text" className="form-control" name="name" placeholder="Tên thuốc" value={medicineData.name} onChange={handleInputChange}/>

                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Tên gốc
                                </label>
                                <Input type="text" className="form-control" name="original_name" placeholder="Tên gốc"  value={medicineData.original_name} onChange={handleInputChange}/>

                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Đơn vị lưu kho
                                </label>
                                {/* <Input type="text" className="form-control" name="storage_unit" value={medicineData.storage_unit} onChange={handleInputChange}/> */}
                                <select onChange={handleOnChangeSelectUnit} value={medicineData.storage_unit}  name= "storage_unit"  style={{width:"200px" , height:"38px"}} placeholder="Tên nhân viên" showSearch className='form-control' >
                                  <option value="Viên">Viên</option>
                                  <option value="Gói">Gói</option>
                                  <option value="Lọ">Lọ</option>
                                  <option value="Chai">Chai</option>
                                  <option value="Ống">Ống</option>
                                  <option value="Tuýt">Tuýt</option>
                                  <option value="Hộp">Hộp</option>
                                  <option value="Vĩ">Vĩ</option>
                           </select>

                              </div>
                            </div>
                          
                          </div>

                          <div className="row mb-4">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Đơn vị sử dụng/ lần
                                </label>
                                <Input type="text" className="form-control" name="use_unit" value={medicineData.use_unit} />

                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label style={{marginLeft:"12%"}} htmlFor="methodOfUse" className="input-search">
                                  Phương thức
                                </label>
                                {/* <Input type="text" className="form-control" name="method_of_use" value={medicineData.method_of_use} onChange={handleInputChange} /> */}
                                <select onChange={handleOnChangeSelectMethodOfUse} value ={medicineData.method_of_use} className="form-control" name= "storage_unit"  style={{width:"200px" , height:"40px",marginLeft:"12%"}} placeholder="Tên nhân viên" showSearch  >
                                    <option value="Uống">Uống</option>
                                    <option value="Nhai">Nhai</option>
                                    <option value="Ngậm">Ngậm</option>
                                    <option value="Đặt âm đạo">Đặt âm đạo</option>
                                    <option value="Thoa">Thoa</option>
                                    <option value="Tiêm">Tiêm</option>
                                    <option value="Nhỏ">Nhỏ</option>
                                    <option value="Xịt">Xịt</option>
                                </select>

                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Code
                                </label>
                                <Input type="text" className="form-control" name="code" value={medicineData.code} />

                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Trạng thái
                                </label>
                                <select style={{width:"200px" , height:"38px"}} onChange={handleSelectChangeStatus} name="status" value={status} className="form-control" id="cars" placeholder="Tất cả">
                                          <option value="1">Đang hoạt động</option>
                                          <option value="0">Không còn sử dụng</option>
                                  </select>
                                {/* <Input type="text" className="form-control" id="storageUnit" value={medicineData.medicineInventory} onChange={handleInputChange} /> */}

                              </div>
                            </div>
                          </div>
                
                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="costPrice" className="input-search">
                                  Đơn giá vốn
                                </label>
                                <Input type="text" className="form-control" name="cost_price" value={medicineData.cost_price} onChange={handleInputChange} />

                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="retailPrice" className="input-search">
                                  Đơn giá bán
                                </label>
                                <Input type="text" className="form-control" name="retail_price" value={medicineData.retail_price} onChange={handleInputChange} />

                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Số lượng tồn
                                </label>
                                <Input readOnly style={{backgroundColor:"#eeeeee"}} type="text" className="form-control" name="inventory_quantity" value={medicineData.inventory_quantity} />

                              </div>
                            </div>
                            
                          </div>

                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Thông báo khi SL tồn nhỏ hơn
                                </label>
                                <Input type="text" className="form-control" name="out_stock_alert_quantity" value={medicineData.out_stock_alert_quantity} onChange={handleInputChange} />

                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Ngày hết hạn
                                </label>
                                <DatePicker disabled inputReadOnly onChange={handleDateChange} value={expiryDate} style={{width:"300px",height:"40px"}}/>
                                {/* <Input type="text" className="form-control" name="expiry_date" value={medicineData.expiry_date} onChange={handleInputChange} /> */}

                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="outExpiryDateAlert" className="input-search">
                                  Thông báo khi số ngày sử
                                </label>
                                <Input type="text" className="form-control" name="out_expiry_date_alert"  value={medicineData.out_expiry_date_alert} onChange={handleInputChange}/>

                              </div>
                            </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="note" className="input-search">
                                    Ghi chú
                                  </label>
                                  <Input type="text" className="form-control" name="note" value={medicineData.note} onChange={handleInputChange} />

                                </div>
                              </div>
                          </div>
                          <div className="button-even justify-content-between " >
                              <Button  color="info" className="btn " onClick={handleSubmit}>Cập nhập</Button>
                              <Link to={"/pharmacist"}>
                                  <Button  color="warning" className="btn ">Quay về kho thuốc</Button>
                              </Link>
                              <Link to={`/medicine/${id}/history`}>
                                    <Button  color="success" className="btn ">Lịch sử dùng thuốc</Button>
                              </Link>

                          </div>
                      </form>
                      </div>
                  </div>
            </div>
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

           </React.Fragment>
       );
  
}

export default (MedicineDetail);

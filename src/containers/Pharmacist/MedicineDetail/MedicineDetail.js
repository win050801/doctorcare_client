import React, { Component,useState,useEffect } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineDetail.scss';
import { Input, Table,Select,DatePicker } from 'antd';
import { Link, useParams } from 'react-router-dom';
// import axios from "../../../axios";
import axios from "axios";
import moment from "moment";


function  MedicineDetail(){

  const [medicineData, setMedicineData] = useState({});

  const [expiryDate, setExpiryDate]= useState(moment(medicineData.expiry_date));

  const [categoryData,setCategoryData] = useState([]);

  const [categoryChoose,setCategoryChoose] = useState([]);

  const [status, setStatus] = useState(medicineData.status);

  const [categoryId, setCategoryId] = useState(medicineData.category_id);

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
      setCategoryChoose(response.data.data);
    };
    fetchCategoryData();
  }, []);


  useEffect(() => {
    const fetchMedicineData = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/${id}`, {});
      setMedicineData(response.data.data);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:9000/api/medicines/${id}/update`, {
          category_id: medicineData.category_id,
          avatar: medicineData.avatar,
          name: medicineData.name,
          expiry_date: medicineData.expiry_date,
          out_stock_alert_quantity: medicineData.out_stock_alert_quantity,
          retail_price: medicineData.retail_price,
          cost_price: medicineData.cost_price,
          status: medicineData.status,
          note : medicineData.note,
          storage_unit: medicineData.storage_unit,
          use_unit: medicineData.use_unit,
          method_of_use: medicineData.method_of_use,
          original_name: medicineData.original_name,
          out_expiry_date_alert: medicineData.out_expiry_date_alert
    });
    console.log(response);
    console.log(medicineData.name);
  };

  const handleSelectChangeStatus = (value) =>{
      setStatus(`${value}`)
      setMedicineData({ ...medicineData, status: value });
  }

  const handleSelectChangeCategory = (value) => {
    setCategoryId(`${value}`)
    setMedicineData({ ...medicineData, category_id: value });
  }

 let handleColor = (time) => {
   return time.getHours() > 12 ? "text-success" : "text-error";
 };

   return (
           <React.Fragment>
            <div style={{ display: 'flex' }}>
                    <Navbar/>
                    <div className="medicine-detail">
                      <div className="medicine-detail-container">
                      <form className="form-medicine-detail">
                          <h2 className="mb-4 text-2xl font-medium">Chi tiết thuốc</h2>
                          <div className="row">
                            <div className="col-lg-2 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Danh mục thuốc
                                </label>
                                {/* <Select className="form-control">
      
                                </Select> */}
                                <Select onChange={handleSelectChangeCategory} value={categoryChoose.name} defaultValue={categoryChoose.name}  name=""  className="form-control" id="cars"  placeholder="Tất cả">
                                                  {categoryData.map(option => (
                                                    <option key={option.id} value={option.id}>
                                                      {option.name}
                                                    </option>
                                                  ))}
                                </Select>
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
                                <Input type="text" className="form-control" name="storage_unit" value={medicineData.storage_unit} onChange={handleInputChange}/>
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
                                <label htmlFor="methodOfUse" className="input-search">
                                  Phương thức
                                </label>
                                <Input type="text" className="form-control" name="method_of_use" value={medicineData.method_of_use} onChange={handleInputChange} />
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
                                <Select onChange={handleSelectChangeStatus} name="status" value={medicineData.status == 1 ? "Đang hoạt động": "Không hoạt động"} className="form-control" id="cars" placeholder="Tất cả">
                                          <option value="1">Đang hoạt động</option>
                                          <option value="0">Không còn sử dụng</option>
                                  </Select>
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
                                <DatePicker onChange={handleDateChange} value={expiryDate} style={{width:"300px",height:"40px"}}/>
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
                              
                              <Button  color="success" className="btn ">Lịch sử dùng thuốc</Button>
                          </div>
                      </form>
                      </div>
                  </div>
            </div>
           </React.Fragment>
       );
  
}

export default (MedicineDetail);

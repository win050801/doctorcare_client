import React, { Component,useState,useEffect } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineDetail.scss';
import { Input, Table,Select } from 'antd';
import { useParams } from 'react-router-dom';
// import axios from "../../../axios";
import axios from "axios";


function  MedicineDetail(){

  const [medicineData, setMedicineData] = useState({});

  const [medicineInventory, setMedicineInventory] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchMedicineData = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/${id}`, {
        category_id: 1,
        medicine_id: -1,
        key_search: "",
        status: 1,
      });
      setMedicineData(response.data);
    };
    fetchMedicineData();
  }, [id]);
  
  useEffect(() => {
    const fetchMedicineInventory = async () => {
      const response = await axios.get(`http://localhost:9000/api/medicines/inventory/`, {
        category_id: 1,
        medicine_id: 1,
      });
      setMedicineInventory(response.data);
    };
      fetchMedicineInventory();
  }, []);

  console.log(medicineData);
  // console.log(medicineInventory);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setMedicineData({
      ...medicineData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(medicineData);
  };

  const [startDate, setStartDate] = useState(new Date());

  const [modalShow, setModalShow] = React.useState(false);

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
                            <div className="col-lg-5 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Tên thuốc
                                </label>
                                <Input type="text" className="form-control" id="name" placeholder="Tên thuốc" value={medicineData.name} onChange={handleInputChange}/>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Tên gốc
                                </label>
                                <Input type="text" className="form-control" id="genericName" placeholder="Tên gốc"  value={medicineData.prefix_name} onChange={handleInputChange}/>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Đơn vị lưu kho
                                </label>
                                <Input type="text" className="form-control" id="storageUnit" value={medicineData.storage_unit} onChange={handleInputChange}/>
                              </div>
                            </div>
                          
                          </div>

                          <div className="row mb-4">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Đơn vị sử dụng/ lần
                                </label>
                                <Input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="methodOfUse" className="input-search">
                                  Phương thức
                                </label>
                                <Input type="text" className="form-control" id="methodOfUse" value={medicineData.method_of_use} onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Đơn vị lưu kho
                                </label>
                                <Input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Số lượng tồn
                                </label>
                                <Input type="text" className="form-control" id="storageUnit" value={medicineData.medicineInventory} onChange={handleInputChange} />
                              </div>
                            </div>
                          </div>
                
                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="costPrice" className="input-search">
                                  Đơn giá vốn
                                </label>
                                <Input type="text" className="form-control" id="costPrice" value={medicineData.cost_price} onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="retailPrice" className="input-search">
                                  Đơn giá bán
                                </label>
                                <Input type="text" className="form-control" id="retailPrice" value={medicineData.retail_price} onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Số lượng tồn
                                </label>
                                <Input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                            
                          </div>

                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Thông báo khi SL tồn nhỏ hơn
                                </label>
                                <Input type="text" className="form-control" id="outStockAlertQuantity" value={medicineData.out_stock_alert_quantity} onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Ngày hết hạn
                                </label>
                                <Input type="text" className="form-control" id="expiryDate" value={medicineData.expiry_date} onChange={handleInputChange} />
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="outExpiryDateAlert" className="input-search">
                                  Thông báo khi số ngày sử
                                </label>
                                <Input type="text" className="form-control" id="outExpiryDateAlert"  value={medicineData.out_expiry_date_alert} onChange={handleInputChange}/>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="note" className="input-search">
                                    Ghi chú
                                  </label>
                                  <Input type="text" className="form-control" id="note" value={medicineData.note} onChange={handleInputChange} />
                                </div>
                              </div>
                          </div>
                          <div className="button-even justify-content-between " >
                              <Button  color="info" className="btn " onClick={handleSubmit}>Cập nhập</Button>
                              <Button  color="warning" className="btn ">Quay về kho thuốc</Button>
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

import React, { Component,useState } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineDetail.scss';
import { Input, Table,Select } from 'antd'


function  MedicineDetail(){

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
                          <h2 className="mb-4 text-2xl font-medium">Thêm thuốc</h2>
                          <div className="row">
                            <div className="col-lg-5 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Tên thuốc
                                </label>
                                <Input type="text" className="form-control" id="name" placeholder="Tên thuốc"/>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Tên gốc
                                </label>
                                <Input type="text" className="form-control" id="genericName" />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Đơn vị lưu kho
                                </label>
                                <Input type="text" className="form-control" id="storageUnit" />
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
                                <label htmlFor="genericName" className="input-search">
                                  Phương thức
                                </label>
                                <Input type="text" className="form-control" id="genericName" />
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
                                <Input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                          </div>
                
                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="name" className="input-search">
                                  Đơn giá vốn
                                </label>
                                <Input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Đơn giá bán
                                </label>
                                <Input type="text" className="form-control" id="genericName" />
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
                                <Input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="input-search">
                                  Ngày hết hạn
                                </label>
                                <Input type="text" className="form-control" id="genericName" />
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="input-search">
                                  Thông báo khi số ngày sử
                                </label>
                                <Input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="name" className="input-search">
                                    Ghi chú
                                  </label>
                                  <Input type="text" className="form-control" id="name" />
                                </div>
                              </div>
                          </div>
                          <div className="button-even justify-content-between " >
                              <Button  color="info" className="btn ">Cập nhập</Button>
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

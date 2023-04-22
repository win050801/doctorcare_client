import React, { Component,useState } from "react";
import { Button } from "reactstrap";
import Navbar from "../../Menu/Navbar";
import './MedicineDetail.scss'


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
                                <label htmlFor="name" className="inputSearch">
                                  Tên thuốc
                                </label>
                                <input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="genericName" className="inputSearch">
                                  Tên gốc
                                </label>
                                <input type="text" className="form-control" id="genericName" />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="inputSearch">
                                  Đơn vị lưu kho
                                </label>
                                <input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                          
                          </div>

                          <div className="row mb-4">
                            <div className="col-lg-3">
                              <div className="form-group">
                                <label htmlFor="name" className="inputSearch">
                                  Đơn vị sử dụng/ lần
                                </label>
                                <input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="inputSearch">
                                  Phương thức
                                </label>
                                <input type="text" className="form-control" id="genericName" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="inputSearch">
                                  Đơn vị lưu kho
                                </label>
                                <input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="inputSearch">
                                  Số lượng tồn
                                </label>
                                <input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                          </div>
                
                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="name" className="inputSearch">
                                  Đơn giá vốn
                                </label>
                                <input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="inputSearch">
                                  Đơn giá bán
                                </label>
                                <input type="text" className="form-control" id="genericName" />
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="inputSearch">
                                  Số lượng tồn
                                </label>
                                <input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                            
                          </div>

                          <div className="row mb-4 justify-content-between">
                            <div className="col-lg-4">
                              <div className="form-group">
                                <label htmlFor="name" className="inputSearch">
                                  Thông báo khi SL tồn nhỏ hơn
                                </label>
                                <input type="text" className="form-control" id="name" />
                              </div>
                            </div>
                            <div className="col-lg-3 ">
                              <div className="form-group">
                                <label htmlFor="genericName" className="inputSearch">
                                  Ngày hết hạn
                                </label>
                                <input type="text" className="form-control" id="genericName" />
                              </div>
                            </div>
                            <div className="col-lg-4 ">
                              <div className="form-group">
                                <label htmlFor="storageUnit" className="inputSearch">
                                  Thông báo khi số ngày sử
                                </label>
                                <input type="text" className="form-control" id="storageUnit" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label htmlFor="name" className="inputSearch">
                                    Ghi chú
                                  </label>
                                  <input type="text" className="form-control" id="name" />
                                </div>
                              </div>
                          </div>
                          <div className="button-even justify-content-between " >
                              <Button color="info" className="btn ">Cập nhập</Button>
                              <Button color="warning" className="btn ">Quay về kho thuốc</Button>
                              <Button color="success" className="btn ">Lịch sử dùng thuốc</Button>
                          </div>
                      </form>
                      </div>
                  </div>
            </div>
           </React.Fragment>
       );
  
}

export default (MedicineDetail);

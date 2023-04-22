import React, { Component,useState } from "react";

import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { Input, Table, Button } from 'antd'


import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import './Warehouse.scss'

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
      {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="p-4 bg-white rounded-lg shadow-md">
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
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button color="info" onClick={props.onHide}>Thêm thuốc</Button>
        </Modal.Footer>
      </Modal>
    );
}

function  Warehouse(){

    const [startDate, setStartDate] = useState(new Date());
    const [modalShow, setModalShow] = React.useState(false);

    const dataSource = [
      {
          key: '1',
          stt: '1',
          hoten: "Mạnh Đức",
          gt:"Nam",
          tuoi: 32,
          kk: "Tiêu hóa",
      },
      {
          key: '2',
          stt: '2',
          hoten: "Đào Cao Thắng",
          gt:"Nam",
          tuoi: 42,
          kk: "<div></div>",
      },
      // {
      //   key: '2',
      //   stt: '2',
      //   age: 42,
      //   address: '10 Downing Street',
      // },
  ];
  const columns = [
      {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',
      },
      {
          title: 'Họ Tên',
          dataIndex: 'hoten',
          key: 'hoten',
      },
      {
          title: 'Giới Tính',
          dataIndex: 'gt',
          key: 'gt',
      },
      {
          title: 'Tuổi',
          dataIndex: 'tuoi',
          key: 'tuoi',
      },
      {
          title: 'Khoa Khám',
          dataIndex: 'kk',
          key: 'kk',
      },
     
  ];

    const handleViewMedicineDetail = () =>{
      console.log("check");
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
                                <div className="col-md-12 justify-content-between">
                                    <h4 className="box-title">
                                    <Button variant="primary" onClick={() => setModalShow(true)}>
                                        Thêm thuốc mơi
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                    <a href="" className="btn btn-danger">Đang cảnh báo</a>
                                    <a href="" className="btn btn-success">Lập báo cáo</a>
                                    <a href="" className="btn btn-info">Xuất kho</a>
                                    <a href="" className="btn btn-info">Nhập kho</a>
                                    </h4>
                                </div>
                            </div>
                            {/* body */}
                            <div className="box-body">
                                <div className="search-container">
                                        <div className="search-content">
                                            <div>
                                                <h5>Từ khóa </h5>
                                                <input type="text" className="inputSearch" placeholder="Tìm kiếm thuốc"></input>
                                            </div>
                                            <div>
                                                <h5>Loại thuốc </h5>
                                                <select className="inputSearch " id="cars">
                                                    <option value="volvo">Nam</option>
                                                    <option value="saab">Nữ</option>
                                                    
                                                </select>
                                            </div>
                                            <div>
                                                <h5>Bắt đầu </h5>
                                                <select className="inputSearch" id="cars">
                                                    <option value="volvo">Nam</option>
                                                    <option value="saab">Nữ</option>
                                                </select>
                                            </div>
                                            <div>
                                                <h5>Sắp xếp theo </h5>
                                                <select className="inputSearch" id="cars">
                                                    <option value="volvo">Nam</option>
                                                    <option value="saab">Nữ</option>
                                                </select>
                                            </div>
                                            <div>
                                             <Button color="info">Nhập kho</Button>
                                            </div>
                                            
                                        </div>
                                        <div className="table-content">
                                            {/* <Table responsive  dataSource={dataSource} columns={columns}  >
                                                
                                            </Table> */}
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

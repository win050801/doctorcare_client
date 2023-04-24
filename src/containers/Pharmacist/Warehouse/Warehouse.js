import React, { Component,useState } from "react";

import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { Input, Table, Button,Select } from 'antd'


import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import './Warehouse.scss'
import ImportWarehouseModal from "../Modal/ImportWarehouseModal";
import ExportWarehouseModal from "../Modal/ExportWarehouseModal";

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
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => {
      setOpen(true);
    };
  
    const handleCloseModal = () => {
      setOpen(false);
    };

    const dataSource = [
      {
        key: '1',
        name: 'John Brown',
        stt: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
        actions: (
          <span>
            <Link to="/medicine/detail"> 
                <Button style={{backgroundColor:'#3c8dbc', color: 'white', fontSize: '15px'}}
                        onClick={() => handleViewMedicineDetail()}
                >
                  Chi tiết</Button>
            </Link>
            <Link to="/medicine/history">
                <Button style={{backgroundColor:'#00a65a', color: 'white', fontSize: '15px'}}>Lịch sử</Button>
            </Link>
            
            <Button style={{backgroundColor:'red', color: 'white', fontSize: '15px'}}>Xóa</Button>
          </span>
        ),
      },
    ];

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
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Giá vốn',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Giá bán',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Đơn vị lưu kho',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tác vụ',
        dataIndex: 'actions',
        key: 'actions',
      },
    ];

    const handleViewMedicineDetail = () =>{
        
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
                                        Lập báo cáo
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
                                                <Input type="text" className="input-search key"placeholder="Tìm kiếm thuốc"></Input>
                                            </div>
                                            <div>
                                                <h5>Loại thuốc </h5>
                                                <Select className="input-search-type" id="cars"  placeholder="Tất cả">
                                                    <option value="volvo">Nam</option>
                                                    <option value="saab">Nữ</option>
                              
                                                </Select>
                                            </div>
                                            <div>
                                                <h5>Bắt đầu </h5>
                                                <Select className="input-search start" id="cars" placeholder="Tất cả">
                                                    <option value="volvo">Nam</option>
                                                    <option value="saab">Nữ</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <h5>Sắp xếp theo </h5>
                                                <Select className="input-search sort" id="cars" placeholder="Chọn">
                                                    <option value="volvo">Nam</option>
                                                    <option value="saab">Nữ</option>
                                                </Select>
                                            </div>
                                            <div>
                                                <h5 className="text-hidden">a</h5>
                                                <Button className="btn-see" >Xem</Button>
                                            </div>
                                            
                                        </div>
                                        <div className="table-content">
                                            <Table responsive  dataSource={dataSource} columns={columns}  >
                                                
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

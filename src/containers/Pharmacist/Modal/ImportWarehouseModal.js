import React, { useState } from 'react';
import { Button, Input, Modal,Table } from 'antd';
import './ImportWarehouseModal.scss'
import { Link } from 'react-router-dom';
import ImportTable from './ImportTable';

const ImportWarehouse = () =>{
   const [open, setOpen] = useState(false);

   const dataSource = [
      {
        key: '1',
        stt: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
        actions: (
          <span>
            <Link to="/medicine/detail"> 
                <Button style={{backgroundColor:'#3c8dbc', color: 'white', fontSize: '15px'}}
                >
                  Chi tiết</Button>
            </Link>
            <Button style={{backgroundColor:'#00a65a', color: 'white', fontSize: '15px'}}>Lịch sử</Button>
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
        editable: true,
      },
      {
        title: 'Tên thuốc',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      },
      {
        title: 'Số lượng',
        dataIndex: 'age',
        key: 'age',
        editable: true,
      },
      {
        title: 'Đơn vị lưu kho',
        dataIndex: 'address',
        key: 'address',
        editable: true,
      },
      {
        title: 'Hạn sử dụng',
        dataIndex: 'address',
        key: 'address',
        editable: true,
      }
      
    ];

  return (
    <>
      <Button className="btn btn-import" type="primary" onClick={() => setOpen(true)}>
        Nhập kho
      </Button>
      <Modal
            title="Phiếu nhập kho"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            >
               <div className='import-warehouse-container'>
                  <div className='btn-add-drug'>
                        <Button className="btn btn-import" type="primary" >

                        </Button>
                  </div>
                  <div className='search-container'>
                        <div style={{width:'38%'}} >
                           <label style={{marginBottom:'5px'}}>Tên nhân viên</label>
                           <Input className='input name' ></Input>
                        </div>
                        <div style={{width:'60%',marginLeft:'2%'}} >
                           <label style={{marginBottom:'5px'}}>Ghi chú</label>
                           <Input className='input note'></Input>
                        </div>
                  </div>
                  <div className='table-container'>
                        <div className='' style={{marginBottom: 16}}>
                          
                            
                        </div>
                        <h5>Thêm thông tin thuốc</h5>
                        <ImportTable/>
                  </div>
               </div>
      </Modal>
    </>
  );
};


export default ImportWarehouse;
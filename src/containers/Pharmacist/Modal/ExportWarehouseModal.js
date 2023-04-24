import React, { useRef, useState } from 'react';
import { Table, Input, Button, Popconfirm, Form ,Modal } from 'antd';
import './ImportWarehouseModal.scss'
import './ExportWarehouseModal.scss'
import { LanguageVariant } from 'typescript';
import { Link } from 'react-router-dom';
import ExportTable from './ExportTable';
import ReactToPrint, { useReactToPrint } from 'react-to-print';


const ExportWarehouse = () =>{
  const [open, setOpen] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: 'test',
      onAfterPrint: () => alert('Print success')
  })

  const [form] = Form.useForm();
  const [data, setData] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
  ]);

  const onEdit = (record) => {
    form.setFieldsValue(record);
  };

  const onDelete = (record) => {
    setData(data.filter((item) => item.key !== record.key));
  };

  const onSave = (values) => {
    const newData = [...data];
    const index = newData.findIndex((item) => values.key === item.key);

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...values });
      setData(newData);
      form.resetFields();
    } else {
      newData.push(values);
      setData(newData);
      form.resetFields();
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Tên thuốc',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'Số lượng',
      dataIndex: 'address',
      editable: true,
    },
    {
      title: 'Dơn giá',
      dataIndex: 'address',
      editable: true,
    },
    
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <div>
            <Button type="primary" onClick={() => onEdit(record)}>
              Sửa
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => onDelete(record)}
            >
              <Button type="danger" style={{ marginLeft: 10 }}>
                  Xóa
              </Button>
            </Popconfirm>
          </div>
        ) : null,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'address',
      editable: true,
    },
  ];

  const onFinish = (values) => {
    const { name, age, address } = values;
    const newData = {
      key: (data.length + 1).toString(),
      name,
      age,
      address,
    };
    setData([...data, newData]);
    form.resetFields();
  };

  return (
    <>
      <Button className="btn btn-import" type="primary" onClick={() => setOpen(true)}>
        Xuất kho
      </Button>
      <Modal
            title="Phiếu nhập kho"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            footer={
              <div>
                <Button >Thoát</Button>
              
                <Button onClick={handlePrint}>Lưu và in</Button>
               
                <Button >Lưu</Button>
              </div>
            }
            >
               <div className='export-warehouse-container'>
                  <div style={{height:'50%', width:'55%',display:'flex', alignItems:'center'}}>
                     <div className='info-info-detail' >
                           <h5>Thông tin khách hàng</h5>

                           <div className='customer customer-name'>
                              <div className='number-1-name'>
                                 <label className='label customer-name'>Tên khách hàng</label>
                                 <Input className='input customer-name'></Input>
                              </div>
                              <div className='number-1-birth-year'>
                                 <label className='label birth-year'>Năm sinh</label>
                                 <Input className='input birth-year'></Input>
                              </div>
                           </div>
                           <div className='customer customer-info'>
                              <div className='number-2-address'>
                                 <label className='label address'>Địa chỉ</label>
                                 <Input className='input address'></Input>
                              </div>
                              <div className='number-2-phone '>
                                 <label className='label phone'>Số điện thoại</label>
                                 <Input className='input phone'></Input>
                              </div>
                           </div>
                           <div className='customer customer-info'>
                              <div className='number-3-name-employee'>
                                 <label className='label name-employee'>Tên nhân viên</label>
                                 <Input className='input name-employee'></Input>
                              </div>
                              <div className='number-3-percent-discount'>
                                 <label className='label percent-discount'>Giảm giá(%)</label>
                                 <Input className='input percent-discount'></Input>
                              </div>
                              <div className='number-3-amount-discount'>
                                 <label className='label amount-discount'>Giảm giá(VND)</label>
                                 <Input className='input amount-discount'></Input>
                              </div>
                           </div>
                           <div className='customer customer-info'>
                              <div className='number-4-note'>
                                 <label className='label note'>Ghi chú</label>
                                 <Input className='input note'></Input>
                              </div>
                           </div>
                           
                     </div>
                     
                  </div>
                  
                     <div className='input-drug'>
                                 <div>
                                    <Form   form={form} onFinish={onFinish}>
                                       <div style={{display: 'flex',alignItems: 'center'}}>
                                          <h5>Thêm thuốc xuất kho</h5>
                                          <Button type="primary" htmlType="submit" style={{marginLeft:'24%',height:'36px',width:'150px'}}>
                                             Thêm thuốc
                                          </Button>
                                       </div>
                                       <div style={{alignItems:'center',flex:'row'}}>
                                          <Form.Item name="name" rules={[{ required: true }]}>
                                             <Input className='input-1' placeholder="Name" />
                                          </Form.Item>
                                          <Form.Item name="age" rules={[{ required: true }]}>
                                             <Input className='input' placeholder="Age" />
                                          </Form.Item>
                                          <Form.Item name="address" rules={[{ required: true }]}>
                                             <Input className='input' placeholder="Address" />
                                          </Form.Item>
                                       </div>
                                    </Form>
                                 </div>
                              
                     </div>
                  
                  
               </div>
               <div  className='table-container'>
                    
                    <Table
                        ref= {componentRef}
                       bordered
                       dataSource={data}
                       columns={columns}
                       pagination={false}
                       />
              </div>
              <h1>Phiếu xuất hàng</h1>
    <div>
      <h2>Thông tin khách hàng</h2>
      <p>Tên khách hàng: </p>
      <p>Địa chỉ: </p>
      <p>Số điện thoại: </p>
    </div>
    <div>
      <h2>Thông tin đơn hàng</h2>
      <p>Số đơn hàng: </p>
      <p>Ngày xuất hàng: </p>
      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {/* {danh_sach_san_pham.map((san_pham) => ( */}
          {/* <tr key={san_pham.id}> */}
            <tr >
              <td>TÊn sản phẩn</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
    <div>
      <h2>Thông tin nhân viên</h2>
      <p>Tên nhân viên xuất hàng: </p>
      <p>Chữ ký nhân viên:</p>
      <img src="{chu_ky_nhan_vien}" alt="Chữ ký nhân viên" />
    </div>
      </Modal>
    </>
  );
};


export default ExportWarehouse;
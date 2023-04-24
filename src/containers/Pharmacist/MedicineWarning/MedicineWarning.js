import "./MedicineWarning.scss";
import Navbar from "../../Menu/Navbar";
import { Input, Table, Button,Select } from 'antd';
import { Link } from 'react-router-dom';

const MedicineWarning = () => {

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
                        
                >
                  Chi tiết</Button>
            </Link>
            <Link to="/medicine/history">
                <Button style={{backgroundColor:'#00a65a', color: 'white', fontSize: '15px'}}>Lịch sử</Button>
            </Link>
            
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

   return(
      <>
         <div style={{display:'flex'}}>
            <Navbar/>
            <div className="warehouse-container">
               <div className="warehouse-content">
                  <div className="title-warehouse">
                     <h3>Lịch sử sử dụng thuốc</h3>
                  </div> 
                  <div className="form-warehouse">
                     <div className="box-body">
                                 <div className="search-container">
                                          <div className="search-content medicine-warning" style={{width:'80%'}}> 
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
                                                   <h5>Kiểu</h5>
                                                   <Select className="" id="cars" placeholder="Chọn" style={{width:'120px'}}>
                                                      <option value="volvo">Ngày hết hạn</option>
                                                      <option value="saab">Nữ</option>
                                                   </Select>
                                             </div>
                                             <div>
                                                   <h5 className="text-hidden">a</h5>
                                                   <Button className="btn-see" >Xem</Button>
                                             </div>
                                             
                                          </div>
                                          <div className="table-content" >
                                             <Table responsive  dataSource={dataSource} columns={columns}  >
                                                   
                                             </Table>
                                          </div>
                                 </div>
                     </div>
                  </div>            
               </div>
            </div>   
         </div>
         
      </>
   )
}

export default MedicineWarning;
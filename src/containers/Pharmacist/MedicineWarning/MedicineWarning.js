import "./MedicineWarning.scss";
import Navbar from "../../Menu/Navbar";
import { Input, Table, Button,Select } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


const MedicineWarning = () => {

   const [categoryData,setCategoryData] = useState([]);

   const [pagination, setPagination] = useState({
         limit: 7,
         total: 0
   });

   const [page, setPage] = useState(1);

   const [medicineData, setMedicineData] = useState([]);

   const [categoryId, setCategoryId] = useState(-1);

   const [isExpiryDateAlert, setIsExpiryDateAlert] = useState(0);

   const [sortBy, setSortBy] = useState(0);

   const [search, setSearch] = useState({
      categoryId: -1,
      isExpiryDateAlert: 0,
      keySearch: "",
      fromDate: "",
      toDate: "",
      sortBy: 0,
   })

   useEffect(() => {
      const fetchCategoryData = async () => {
        const response = await axios.get(`http://localhost:9000/api/categories/`, {
            params:{
              category_id: -1,
            }
        });
        setCategoryData(response.data.data);
      };
      fetchCategoryData();
   }, []);

   useEffect(() => {
      const fetchCategoryData = async () => {
        const response = await axios.get(`http://localhost:9000/api/medicines/warning`, {
            params:{
               category_id: search.categoryId,
              is_expiry_date_alert: search.isExpiryDateAlert,
              key_search: search.keySearch,
              from_date: search.fromDate,
              to_date: search.toDate,
              sort_by: search.sortBy,
              limit: pagination.limit,
              page: page
            }
        });
      const sttStart = (page - 1) * pagination.limit + 1;


      const medicineDataWithStt = response.data.data.list.map((medicine, index) => {
         const stt = sttStart + index;
         return { ...medicine, stt };
      });

      setMedicineData(medicineDataWithStt);
      setPagination({ ...pagination, total: response.data.data.total_record });

      };
      fetchCategoryData();
   }, [search,page]);

   const handleSelectChangeCategory = (value) => {
      setCategoryId(`${value}`)
      setSearch({ ...search, categoryId: value });
    }

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSearch({ ...search, [name]: value });
      console.log(search);
    };

   const handleSelectChangeSortBy = (value) => {
      setSortBy(`${value}`)
      setSearch({ ...search, sortBy: value });
   }

   const handleSelectChangeType = (value) => {
      setIsExpiryDateAlert(`${value}`)
      setSearch({ ...search, isExpiryDateAlert: value });
   }

   const handleTableChange = (pagination, filters, sorter) => {
      // Lấy ra số trang hiện tại
      // setPagination({...pagination, page: pagination.current})
      console.log(pagination.current);
      setPage(pagination.current)
      // ...
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
        dataIndex: 'id',
        key: 'stt',
      },
      {
        title: 'Tên thuốc',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Ngày hết hạn',
        dataIndex: 'expiry_date',
        key: 'age',
      },
      {
        title: 'Giá vốn',
        dataIndex: 'cost_price',
        key: 'cost_price',
      },
      {
        title: 'Giá bán',
        dataIndex: 'retail_price',
        key: 'retail_price',
      },
      {
        title: 'Số lượng tồn',
        dataIndex: 'inventory_quantity',
        key: 'inventory_quantity',
      },
      {
         title: 'Ngày nhập kho',
         dataIndex: 'inventory_quantity',
         key: 'inventory_quantity',
      },
    ];

   return(
      <>
         <div style={{display:'flex'}}>
            <Navbar/>
            <div className="warehouse-container">
               <div className="warehouse-content">
                  <div className="title-warehouse">
                     <h3>Cảnh báo</h3>
                  </div> 
                  <div className="form-warehouse">
                     <div className="box-body">
                                 <div className="search-container">
                                          <div className="search-content medicine-warning" style={{width:'80%'}}> 
                                             <div>
                                                   <h5>Từ khóa </h5>
                                                   <Input onChange={handleInputChange} name="keySearch" type="text" className="input-search key"placeholder="Tìm kiếm thuốc"></Input>
                                             </div>
                                             <div>
                                                   <h5>Loại thuốc </h5>
                                                   <Select onChange={handleSelectChangeCategory} name="categoryId"  className="input-search-type" id="cars"  placeholder="Tất cả">
                                                      {categoryData.map(option => (
                                                         <option key={option.id} value={option.id}>
                                                            {option.name}
                                                         </option>
                                                      ))}
                                                   </Select>
                                             </div>
                                             
                                             <div>
                                                   <h5>Sắp xếp theo </h5>
                                                   <Select onChange={handleSelectChangeSortBy}  className="input-search sort" id="cars" placeholder="Chọn">
                                                      <option value="0">Tất cả</option>
                                                      <option value="1">Ngày hết hạn (tăng dần)</option>
                                                      <option value="2">Ngày hết hạn (giảm dần)</option>
                                                      <option value="3">Số lượng tồn (tăng dần)</option>
                                                      <option value="4">Số lượng tồn (giảm dần)</option>
                                                   </Select>
                                             </div>
                                             <div>
                                                   <h5>Kiểu</h5>
                                                   <Select onChange={handleSelectChangeType} className="" id="cars" placeholder="Chọn" style={{width:'120px'}}>
                                                      <option value="0">Tất cả</option>
                                                      <option value="1">Ngày hết hạn</option>
                                                      <option value="2">Số lượng tồn</option>
                                                   </Select>
                                             </div>
                                             <div >
                                                   <h5>Bé hơn </h5>
                                                   <Input style={{width:"50px"}}></Input>
                                             </div>
                                             <div>
                                                   <h5 className="text-hidden">a</h5>
                                                   <Button className="btn-see" >Xem</Button>
                                             </div>
                                             
                                          </div>
                                          <div className="table-content" >
                                             <Table   responsive  
                                                      dataSource={medicineData} 
                                                      columns={columns}  
                                                      pagination={{
                                                         current: page,
                                                         pageSize: pagination.limit,
                                                         total: pagination.total,
                                                       }}
                                                       onChange={handleTableChange}
                                             />
                                                         
                                             
                                          </div>
                                          <Link to={"/pharmacist"}>
                                             <Button  color="warning" className="btn-back">Quay về kho thuốc</Button>
                                          </Link>
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
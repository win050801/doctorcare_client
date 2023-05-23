import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManagerUser.scss';
import axios from 'axios';
import './ManageUser.scss';
import { Input, Table, Button,Select ,Form, Space,DatePicker,message   } from 'antd';

// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// // import style manually
// import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
// const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
         this.state = {
            users: [],
            user_id: -1,
            key_search: '',
            sort_by: -1,
            is_active: -1,
            user_define: 1,
            limit: 6,
            page: 0
         }
    }

    componentDidMount() {
        this.fetchData();
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState.user_id !== this.state.user_id || prevState.key_search !== this.state.key_search || prevState.sort_by !== this.state.sort_by || prevState.is_active !== this.state.is_active || prevState.user_define !== this.state.user_define || prevState.limit !== this.state.limit || prevState.page !== this.state.page) {
          this.fetchData();
        }
      }
    
      async fetchData() {
        try {
          const res = await axios.get('http://localhost:9000/api/users/', {
            params: {
              user_id: this.state.user_id,
              key_search: this.state.key_search,
              sort_by: this.state.sort_by,
              is_active: this.state.is_active,
              user_define: this.state.user_define,
              limit: this.state.limit,
              page: this.state.page,
            },
            headers: {
              'Authorization': 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
              'Content-Type': 'application/json'
            }
          });
          console.log(res);
          if (res && res.data.status === 200) {
            this.setState({
              users: res.data.data.list
            });
          }
        } catch (error) {
          // Xử lý lỗi
        }
      }
    
    handleDeleteUser = async (e,item) =>{
        e.preventDefault();
        const id = item.id;
        const res = await axios.post(`http://localhost:9000/api/users/${id}/delete`, null, {
            headers: {
                'Authorization': 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
                'Content-Type': 'application/json'
            }
        });
        if (res && res.status === 200) {
            message.success("Xóa user thành công");
            this.setState(prevState => ({
                users: prevState.users.filter(user => user.id !== id)
            }));
            return;
        }
        message.error("Xóa user không thành công");


    }

    handleEditUser = async(e,item) =>{
        e.preventDefault();
        this.props.handleEditUserFromParent(item)
    }

    handleInputChange = (event) => {
        this.setState({ key_search: event.target.value });
    }

    handleSelectChangeStatus = (value) => {
        this.setState({ is_active: value });
      }
    
    handleSelectChangeRole = (value) => {
        this.setState({ user_define: value });
    }

    render() {
      let users = this.state.users;
      let {user_id, key_search, sort_by, is_active, user_define, limit, page} = this.state
      return (
        <>
            <div className="box-body">
                                    
                                    <div className="search-container">
                                            <div className="search-content">
                                                <div style={{marginLeft:"0%"}}>
                                                    <h5>Từ khóa </h5>
                                                    <Input value={this.state.key_search} onChange={this.handleInputChange} style={{width:"250px"}}  name="keySearch" type="text" className="input-search key"placeholder="Tìm kiếm"></Input>
                                                </div>
                                                
                                                <div>
                                                    <h5>Quyền hạn </h5>
                                                    <Select onChange={this.handleSelectChangeRole} name="status" style={{width:"160px"}} className="input-search start" id="cars" placeholder="Tất cả">
                                                        <option value="-1">Tất cả</option>
                                                        <option value="1">Bác sĩ</option>
                                                        <option value="2">Nhân viên</option>
                                                        <option value="3">Bệnh nhân</option>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <h5>Sắp xếp theo </h5>
                                                    <Select  onChange={this.handleSelectChangeStatus} name="sortBy"  className="input-search sort" id="cars" placeholder="Chọn">
                                                        <option value="0">Tất cả</option>
                                                        <option value="1">Tên thuốc (Tăng dần)</option>
                                                        <option value="2">Tên thuốc (giảm dần)</option>
                                                        <option value="3">Ngày nhập kho (tăng dần)</option>
                                                        <option value="4">Ngày nhập kho (giảm dần)</option>
                                                        <option value="5">Số lượng tồn (tăng dần)</option>
                                                        <option value="6">Số lượng tồn (giảm dần)</option>
                                                       
                                                    </Select>
                                                </div>
                                                <div>
                                                    <h5 className="">Trạng thái</h5>
                                                    <Select onChange={this.handleSelectChangeStatus} name="isExpiry"  className="input-search isExpiry" id="cars" placeholder="Chọn">
                                                        <option value="-1">Tất cả</option>
                                                        <option value="1">Đang hoạt động</option>
                                                        <option value="0">Không còn sử dụng</option>
                                                    </Select>
                                                </div>
                                                
                                            </div>
                                       
                                    </div>
                            </div>
          <table id= "TableManagerUser">
              <tbody>
                  <tr>
                      <th>Họ và Tên</th>
                      <th>Hình ảnh</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
              
                      <th>Quyền hạn</th>
                      <th>Thao tác</th>
                  </tr>
                  {users && users.length > 0 &&
                     users.map((item,index) =>{
                        return (
                        <tr key="index">
                              <td style={{width:"250px"}}>{item.name}</td>
                              <td  style={{width:"80px"}}> <img style={{height:"60px",width:"60px"}} src={item.avatar} alt="Image"/></td>
                              <td style={{width:"300px"}}>{item.email}</td>
                              <td>{item.phone}</td>
                              <td>{item.role}</td>
                              <td>
                              <button  onClick={(e) => this.handleEditUser(e,item)} className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                              <button
                                onClick={(e) => this.handleDeleteUser(e,item)}
                                className='btn-delete'><i className='fas fa-trash'></i></button>
                              </td>
                       </tr>
                        )
                     })
                  }
                  
              </tbody>
          </table>
   
         
           {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
        </>
      )
  }


}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

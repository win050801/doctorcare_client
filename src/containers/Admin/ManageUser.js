import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import axios from 'axios';
import { CommonUtils } from '../../utils';
import './ManageUser.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
import { Input, Table, Button,Select ,Form, Space,DatePicker,message   } from 'antd';
import TableMangeUser from './TableMangeUser';
import Navbar from '../Menu/Navbar';

class ManageUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            roleArr: [],
            input: "",
            email: "",
            name: "",
            phone:"",
            address: "",
            gender: 0,
            roleId: 1,
            position: "",
            description: "",
            avatar: "",
            note: "",
            action: "",
            currentUser: ""
        }
    }

    componentDidMount() {
      this.fetchRolesData();
    }

    async fetchRolesData() {
      try {
        const res = await axios.get(`http://localhost:9000/api/users/roles`, {
          params: {
            pre_name: this.state.input
          }
        });
        if (res && res.data.status === 200) {
          this.setState({
            roleArr: res.data.data,
            previewImgUrl: "",
            isOpen: false
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    // async componentDidMount() {
    //     try {
    //       const res = await axios.get(`http://localhost:9000/api/users/roles`,{
    //           params:{
    //             pre_name: this.state.input
    //           }
    //       })
    //       if(res && res.data.status === 200){
    //           this.setState({
    //             roleArr: res.data.data,
    //             previewImgUrl: "",
    //             isOpen: false
    //           })
    //       }
    //     } catch (error) {
    //         console.log(error);
    //     } 
    // }

    async handleOnChangeImage(event) {
      const file = event.target.files[0];
      if(file){
        let base64 = await CommonUtils.getBast64(file);
        const objectUrl =  URL.createObjectURL(file);
        this.setState({
          previewImgUrl: objectUrl,
          avatar: base64
        })
      }
    }

    openPreviewImage = () =>{
      console.log(this.state.previewImgUrl);
      if(!this.state.previewImgUrl ) return;
        this.setState({
          isOpen: true
        })
    }

    handleSelectChange(event) {
      const selectedValue = event.target.value;
      this.setState({ input: "R" }, () =>{
        this.fetchRolesData();
      });
    }

    handleSelectChangePosition(event){
      const selectedValue = event.target.value;
      this.setState({ input: "P" }, () =>{
        this.fetchRolesData();
      });
    }

    onChangeInput = (e, id) =>{
      let copyState = {...this.state}
      copyState[id] = e.target.value;

      this.setState({
          ...copyState
      },()=>{
        console.log(this.state);
      })
    }
    
    handleSaveUser = async (e) => {
      e.preventDefault();
      this.checkValidateInput();
      const isValid = this.checkValidateInput();
      const { name, email, phone, address, gender, roleId, position, description, avatar } = this.state;
      const formData = new FormData();
      console.log(this.state.roleId);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('gender', gender);
      formData.append('roleId', this.state.roleId);
      formData.append('position', position);
      formData.append('description', this.state.note);
      formData.append('avatar', avatar);

      let {action} = this.state;

      if (!isValid)  return;

      if(action === "edit"){
        const res = await axios.post(`http://localhost:9000/api/users/${this.state.currentUser}/update`, formData, {
          headers: {
            Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res && res.data.status === 200) {
          message.success("Cập nhập dùng thành công");
            this.setState({
              name: '',
              email: '',
              phone: '',
              address: '',
              gender: '',
              role: '',
              position: '',
              note: '',
              action: '',
              previewImgUrl:''
            });
        }
        else{
         message.error(res.data.message);
        }
      }else{
        const res = await axios.post('http://localhost:9000/api/users/create', formData, {
          headers: {
            Authorization: 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res && res.data.status === 200) {
          message.success("Thêm người dùng thành công");
          // this.setState(prevState => ({
          //   roleArr: [...prevState.roleArr, res.data.data],
          // }));
          this.setState({
            name: '',
            email: '',
            phone: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            note: '',
            previewImgUrl: ''
          });
        }
        else{
         message.error(res.data.message);
        }
      }
    }
  
    checkValidateInput  = () =>{
      let isValid = true;
      let arrCheck = ['email', 'name', 'phone', 'address', 'gender', 'note'];
      for(let i = 0; i < arrCheck.length; i++){
          if(!this.state[arrCheck[i]] && this.state[arrCheck[i]] !== 0 ){
            isValid = false;
            message.error("Bạn cần truyền: "+arrCheck[i])
            break;
          }
      }
      return isValid;
    }

    handleEditUserFromParent = (user) =>{
      console.log(user);
      this.setState({
          action: "edit"
      })
      let imageBuffer = '';
      if(user.avatar){
        imageBuffer = new Buffer(user.avatar,'base64').toString('binary');
      }
      this.setState({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          gender: user.gender,
          role: user.role_id,
          position: user.position,
          description: user.description,
          avatar: user.avatar,
          note: user.note,
          currentUser: user.id,
          previewImgUrl: user.avatar
          // avatar: imageBase64
      },()=>{
          console.log(this.state.previewImgUrl);
          console.log(user.avatar);
      });

    }

    render() {
        let role = this.state.roleArr;
        let language = this.props.language;
        let {input, email, name, phone, address, gender, roleId, position, description, avatar,note} = this.state
        return (
         <div style={{ display: 'flex' }}>
            <Navbar/>
            <div className="user-redux-container">
               <div className='title'>
                     Quản lí người dùng
               </div>
               <div className='user-redux-body'>
                  <div className='container'>
                  <form className="p-4 bg-white rounded-lg shadow-md">
                        <div className="row">
                          <div className="col-lg-5 col-md-6 mb-4">
                            <div className="form-group">
                              <label htmlFor="name" className="inputSearch">
                                Họ Và Tên
                              </label>
                              <input type="text" className="form-control" id="name" 
                                value={name} onChange={(e) =>{ this.onChangeInput(e, 'name')}} 
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 mb-4">
                            <div className="form-group">
                              <label htmlFor="genericName" className="inputSearch">
                                Email
                              </label>
                              <input type="text" className="form-control" id="email" 
                                value={email} onChange={(e) =>{ this.onChangeInput(e, 'email')}} 
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 mb-4">
                            <div className="form-group">
                              <label htmlFor="storageUnit" className="inputSearch">
                                Số điện thoại
                              </label>
                              <input type="text" className="form-control" id="phone" 
                                value={phone} onChange={(e) =>{ this.onChangeInput(e, 'phone')}} 
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="name" className="inputSearch">
                                Địa chỉ
                              </label>
                              <input type="text" className="form-control" id="address" 
                                value={address} onChange={(e) =>{ this.onChangeInput(e, 'address')}} 
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 ">
                            <div className="form-group">
                              <label htmlFor="genericName" className="inputSearch">
                                Giới tính
                              </label>
                              <select defaultValue={this.state.gender} type="text" className="form-control" id="gender"
                                    onChange={(e) => { this.onChangeInput(e, 'gender') }}
                                  >
                                    <option value="0" selected={this.state.gender === 0}>Nam</option>
                                    <option value="1" selected={this.state.gender === 1}>Nữ</option>
                                    <option value="2" selected={this.state.gender === 2}>Khác</option>
                                  </select>

                            </div>
                          </div>
                          
                          


                        </div>
              
                  

                        <div className="row mb-4 justify-content-between">
                          <div className="col-lg-3">
                            <div className="form-group">
                              <label htmlFor="name" className="inputSearch">
                                Quyền hạn
                              </label>
                              <select
                                  onChange={(e) => { this.onChangeInput(e, 'role') }}
                                  className="form-control"
                                  id="genericName"
                                >
                                  {role && role.length > 0 && role.map((item) => (
                                    <option key={item.id} value={item.id} selected={item.id === this.state.role}>
                                      {item.description}
                                    </option>
                                  ))}
                                </select>
                            </div>
                          </div>
                          

                          
                          <div className="col-lg-6 ">
                            <div className="form-group">
                              <label htmlFor="storageUnit" className="inputSearch">
                                Ghi chú
                              </label>
                              <input type="text" className="form-control" id="note" 
                                value={note} onChange={(e) =>{ this.onChangeInput(e, 'note')}} 
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 ">
                            <div className="form-group">
                              <label>
                                Ảnh đại diện
                              </label>
                              <div className='preview-img-container'>
                              <input id="previewImg" type="file" hidden 
                                  onChange={(event) => this.handleOnChangeImage(event)} />

                                <label className='label-upload ' htmlFor='previewImg' >Tải ảnh <i className="fa-solid fa-upload"></i></label>
                                <div className='preview-image'
                                  style={{backgroundImage: `url(${this.state.previewImgUrl})`}}
                                  onClick={()=> this.openPreviewImage()}
                                >
                                  
                                </div>
                              </div>
                              
                            </div>
                          </div>
                          
                        </div>
                        <button onClick={(e)=> {this.handleSaveUser(e)}} type="submit" className={this.state.action === "edit" ? "btn btn-warning" : "btn btn-primary"}>{this.state.action === "edit" ? "Cập nhập" : "Thêm mới"}</button>
                       
                        <div className='col-12'>
                            <TableMangeUser
                              handleEditUserFromParent = {this.handleEditUserFromParent}
                            />
                        </div>
                    </form>
                     
                  </div>

               </div>
               
              {
                this.state.isOpen === true && 
                <Lightbox
                    mainSrc={this.state.previewImgUrl}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                />
              }
            </div>
         </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
      language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

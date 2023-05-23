import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import { useState,useEffect } from 'react';
import { Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

const mdParser = new MarkdownIt(/* Markdown-it options */);


const ManageDoctor = () => {

      const mdParser = new MarkdownIt();

      const [doctorData, setDoctorData] = useState([]);

      const [specialtyData, setSpecialtyData] = useState([]);

      const [content, setContent] = useState({
         contentMarkDown: '',
         contentHTML: '',
         selectedDoctor: '',
         selectedSpecialty: '',
         description: ''
      });

      const handleEditorChange = ({ html, text }) => {
         setContent({...content,
            contentMarkDown: text,
            contentHTML: html
         })
         console.log(content);
      };

      const handleSaveContentMarkDown =() =>{
         
      }

      useEffect(() => {
         const fetchMedicineData = async () => {
               const res = await axios.get('http://localhost:9000/api/users/', {
                  params: {
                     user_id: -1,
                     key_search: "",
                     sort_by: -1,
                     is_active: 1,
                     user_define: 1,
                     limit: 100,
                     page: 0,
                  },
                  headers: {
                     'Authorization': 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
                     'Content-Type': 'application/json'
                  }
               });

               if(res && res.data.status === 200){
                     setDoctorData(res.data.data.list)
                     console.log(doctorData);
               }

               const resSpecialty = await axios.get('http://localhost:9000/api/doctors/specialties', {
                  params: {
                     specialization_id: -1,
                     key_search: "",
                     limit: 100,
                     page: 0,
                  },
                  headers: {
                     'Authorization': 'eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjA5MTE3NjU3NjAiLCJwYXNzd29yZCI6IjEyMzQifQ==',
                     'Content-Type': 'application/json'
                  }
               });
               
               if(res && res.data.status === 200){
                     setSpecialtyData(resSpecialty.data.data.list)
                     
               }
           
         };
         fetchMedicineData();
       }, []);

      const handleChangeSelectDoctor = (value) =>{
         // setSearchMedicine(`${value}`)
         // const selectedMedicine = medicineData.find((medicine) => medicine.name === `${value}`);
         // setMedicineId(selectedMedicine ? selectedMedicine.id : -1);
         // setCostPrice(selectedMedicine? selectedMedicine.cost_price : -1)
      }

      return (
         <div className='manage-doctor-container'>
            <div className='manage-doctor-title'>
               Tạo thêm thông tin doctors
            </div>
            <div className='more-info'>
               <div className='content-left form-group'>
                  <div>
                     <label>Chọn chuuyên khoa</label>
                     <Select onChange={handleChangeSelectDoctor} allowClear showSearch className='select-doctor' getPopupContainer={(trigger) => trigger.parentElement}  placeholder="Chọn chuyên khoa">
                        {specialtyData.map(option => (
                           <option key={option.id} value={option.id}>
                              {option.name}
                           </option>
                        ))}
                     </Select>
                     
                  </div>
                  <div>
                     <label>Chọn bác sĩ</label>
                     
                     <Select onChange={handleChangeSelectDoctor} allowClear showSearch className='select-specialty' getPopupContainer={(trigger) => trigger.parentElement}  placeholder="Chọn bác sĩ">
                        {doctorData.map(option => (
                           <option key={option.id} value={option.id}>
                              {option.name}
                           </option>
                        ))}
                     </Select>
                  </div>
                  
               </div>
               <div className='content-right'>
                  <label>Thoông tin giới thiệu</label>
                  <TextArea className='form-control' rows="4">
                        add
                  </TextArea>
               </div>
               
            </div>
            <div className='manage-doctor-editor'>
               <MdEditor
                  style={{ height: '500px' }}
                  renderHTML={text => mdParser.render(text)}
                  onChange={handleEditorChange}
               />
            </div>
            <button 
               onClick={handleSaveContentMarkDown}
               className='save-content-doctor'>Lưu thông tin</button>
         </div>
      );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

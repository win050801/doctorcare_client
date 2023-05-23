import React, { Component,useState,useEffect } from "react";
import Navbar from "../Menu/Navbar";
import {Line} from '@ant-design/charts';
import { Chart } from "react-google-charts";
import './Aside.scss';

function  Aside(){
   return (
           <React.Fragment>
            <div className="container report">

           
                <div className="container-patient">
                    <div className="image-icon patient">
                            
                    </div>
                    <div className="text-report patient">
                        <div className="text-data patient">
                            <label className="label-report">
                                Bệnh nhân
                            </label>
                            <label className="label-report-number">
                                2
                            </label>
                        </div>
                        <div className="text-line patient">
                        
                        </div>
                        <div className="text-data2 patient">
                            <label className="label-report">
                                Tổng số bệnh nhân
                            </label>
                        </div>
                    </div>
                
                </div>
                <div className="container-medicine">
                    <div className="image-icon medicine ">
                            
                    </div>
                    <div className="text-report medicine">
                        <div className="text-data medicine">
                            <div className="text-data patient">
                                <label className="label-report">
                                    Thuốc
                                </label>
                                <label className="label-report-number">
                                    2
                                </label>
                            </div>
                        </div>
                        <div className="text-line medicine">
                        
                        </div>
                        <div className="text-data2 medicine">
                            <label className="label-report">
                                Tổng số thuốc
                            </label>
                        </div>
                    </div>
                
                </div>
                <div className="container-calender">
                    <div className="image-icon calender" >
                            
                    </div>
                    <div className="text-report calender">
                        <div className="text-data calender">
                                <label className="label-report">
                                    Toa thuốc 
                                </label>
                                <label className="label-report-number">
                                    2
                                </label>
                        </div>
                        <div className="text-line calender">
                        
                        </div>
                        <div className="text-data2 calender">
                                <label className="label-report">
                                    Toa thuốc đã bán
                                </label>
                        </div>
                    </div>
                
                </div>
                <div className="container-money">
                    <div className="image-icon money">
                                
                    </div>
                    <div className="text-report money">
                        <div className="text-data money">
                                <label className="label-report">
                                    Tiền
                                </label>
                                <label className="label-report-number">
                                    2
                                </label>
                        </div>
                        <div className="text-line money">
                        
                        </div>
                        <div className="text-data2 money">
                                <label className="label-report">
                                    Tiền
                                </label>
                        </div>
                    </div>
                
                </div>
            </div>
            
           </React.Fragment>
       );
  
}

export default (Aside);

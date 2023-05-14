
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import MenuDoctorSieuAm from "../MenuDoctorSieuAm/MenuDoctorSieuAm"
import UIKham from "../UIKham/UIKham"
import UIKhamSieuam from "../UIKhamsieuam/UIKhamsieuam"
import "../UISieuam/UISieuam.scss"
import { useState } from "react"
export default function UISieuam()
{
    const [patient,setPatient]=useState({name:"",address:"",phone:"",weight:"",height:""})
    return(
        <div className="doctorSieuam">
            
               <MenuDoctorSieuAm patient={patient} setPatient={setPatient}></MenuDoctorSieuAm>
               <UIKhamSieuam patient={patient} setPatient={setPatient}></UIKhamSieuam>
            
        </div>
    )
}
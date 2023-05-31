
import Getsick from "../Getsick/Getsick"
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import MenuDoctorSieuAm from "../MenuDoctorSieuAm/MenuDoctorSieuAm"
import Search from "../Search/Search"
import UIKham from "../UIKham/UIKham"
import UIKhamSieuam from "../UIKhamsieuam/UIKhamsieuam"
import "../UISieuam/UISieuam.scss"
import { useState } from "react"
import "../UILeTan/UILetan.scss"
import Navbar from "../../containers/Menu/Navbar"
export default function UILeTan() {
    const [patient,setPatient] = useState()
    return (
        
        <div className="containerLetan">
            <Navbar></Navbar>
            <Search setPatient={setPatient}></Search>
            <Getsick patient={patient}></Getsick>
        </div>
    )
}
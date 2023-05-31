
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
import { Redirect } from 'react-router-dom';
export default function UILeTan() {
    const user = localStorage.getItem("currentUser")
    console.log(user);
    console.log("alo");
    const [patient, setPatient] = useState()
    return (
        <>
            {
                user !== "logout" ? (<>
                    <div className="containerLetan">
                        <Navbar></Navbar>
                        <Search setPatient={setPatient}></Search>
                        <Getsick patient={patient}></Getsick>
                    </div>

                </>) : (<>
                    <Redirect to="/login" />
                    
                </>)
            }
            
        </>

    )
}
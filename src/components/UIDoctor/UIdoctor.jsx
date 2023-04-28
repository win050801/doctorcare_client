
import "../../components/UIDoctor/UIdoctor.scss"
import MenuDoctor from "../MenuDoctor/MenuDoctor"
import UIKham from "../UIKham/UIKham"
export default function UIdoctor()
{
    return(
        <div className="doctorContainer">
            
                <MenuDoctor></MenuDoctor>
                <UIKham></UIKham>
            
        </div>
    )
}
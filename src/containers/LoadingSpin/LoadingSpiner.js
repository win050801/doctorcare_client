import { Spin } from 'antd';
import Navbar from '../Menu/Navbar';

const LoadingSpinner = () => {
  return (
   <>
      <div style={{ display: 'flex' }}>
               <Navbar/>
               <div style={{height:"100%", width:"100%"}}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <Spin size="large" />
               </div>
    </div>
      </div>
   </>
    
  );
};

export default LoadingSpinner;

import React, { useContext } from 'react'
import { UserContext } from  '../../context/UserContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({children,activeMenu}) => {
  const {user} = useContext(UserContext);
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar activeMenu={activeMenu}/>
      {user && (
        <div className="flex flex-1">
            <div className='max-[1080px]:hidden'>
                <SideMenu activeMenu={activeMenu}/>
            </div>
            
            <div className='grow mx-5 overflow-y-auto'>{children}</div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout

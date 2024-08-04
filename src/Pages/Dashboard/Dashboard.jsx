import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../Components/Dashboard/TopBar';
import SideBar from '../../Components/Dashboard/SideBar';
import './Dashboard.css'


const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard-itemx'>
        <SideBar />
        <div className='topbar-outlet'>
          <TopBar />
          <div style={{marginTop: '71px', width:"100%", }}>
            <Outlet /> {/* bach tal3 2abna2 dashboard lkaynin f route dyal dashboard */}
          </div>
        </div>
        
      </div>
    </div>
    
    
  )
}

export default Dashboard

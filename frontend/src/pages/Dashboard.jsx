import BottomNavBar from '@/components/shared/BottomNavBar';
import DashboardComments from '@/components/shared/DashboardComments';
import DashboardCreatePost from '@/components/shared/DashboardCreatePost';
import DashboardPosts from '@/components/shared/DashboardPosts';
import DashboardProfile from '@/components/shared/DashboardProfile';
import DashboardSideBar from '@/components/shared/DashboardSideBar'
import DashboardUser from "@/components/shared/DashboardUser"
import MainDashboard from '@/components/shared/MainDashboard';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
  
const Dashboard = () => {
  const location=useLocation();
  const [tab,setTab]=useState("");

  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search)
    const tabFromUrl= urlParams.get("tab")

    // console.log(urlParams);
    // console.log(tabFromUrl);

    if(tabFromUrl){
      setTab(tabFromUrl)
    }

  },[location.search]);  

  return (
    <div className='mih-h-screen flex flex-col md:flex-row w-full'>
      {/* Sidebar */}
      <div className='hidden md:block'>
        <DashboardSideBar></DashboardSideBar>
      </div>

      <BottomNavBar/>

      {/* Profile */}
      <div className='w-full'>
       {tab==="profile" && <DashboardProfile/> }

        {/* news articles  */}
       {tab==="posts" && <DashboardPosts /> }

        {/* create post */}
        {tab==="create-post" && <DashboardCreatePost /> }

       {/* get all users */}
       {tab==="users" && <DashboardUser></DashboardUser>}

       {/* get all comments */}
       {tab==="comments" && <DashboardComments></DashboardComments>}
       
       {/*main dasboard */}
        {tab==="dashboard" && <MainDashboard></MainDashboard>}

      </div>
    </div>
  )
}

export default Dashboard
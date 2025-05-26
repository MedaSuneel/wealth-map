import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';

function MainLayout() {
  return (
    <div className="flex-col justify-center items-center h-full bg-[#005A76]">
    <Header />
    <Outlet />
  </div>
  )
}

export default MainLayout
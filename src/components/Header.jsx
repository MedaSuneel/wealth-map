import React from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  const navItems = [
    { name: "Map", path: "usmap" },
    { name: "Employees", path: "employee" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between p-2 ">
        <div className='flex items-center space-x-2'>
          <img src='wealthmaplogo.jpg' alt="Logo" className="w-17 h-12 rounded-4xl ml-4" />
          <h1 className='text-2xl text-orange-500 font-bold'>Wealth</h1>
          <h1 className='text-2xl text-white font-bold'>Map</h1>
        </div>
        <div className='flex items-center space-x-14 py-2 px-6'>
              {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-lg font-medium relative pb-2 
                after:content-[''] after:absolute after:bottom-0 after:left-0 
                after:w-full after:h-[4px] after:rounded after:transition-all 
                ${
                  isActive
                    ? "text-white after:bg-orange-500"
                    : "text-white hover: after:bg-transparent hover:after:bg-orange-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <img src='/Profile.png' alt="Profile"
           className='w-12 h-12 rounded-full border-4 border-white cursor-pointer hover:scale-110 hover:border-orange-500 transition duration-200'
           onClick={() => navigate('/profile') } />
        </div>
      </div>
    </div>
  )
}

export default Header
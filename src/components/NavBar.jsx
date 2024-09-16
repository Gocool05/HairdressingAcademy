// NavBar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './style.component.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ConfigProvider, Drawer } from 'antd';
import { useQuery } from 'react-query';
const API_URL = process.env.REACT_APP_API_URL;
const Token = localStorage.getItem("JwtToken");
let jwt;
setTimeout(()=>{
jwt = localStorage.getItem("JwtToken")
},1000)

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const Home = (e) => {
    navigate(`${e}`)
  }

  const login = () => {
    navigate('/login')
  }

  const Signout = () => {
    localStorage.removeItem("JwtToken");
    localStorage.removeItem("UserId");
    localStorage.removeItem("User");
    localStorage.removeItem("EmailId");
    setTimeout(()=>{
      window.location.reload();
      navigate("/", { replace: true });
    },1000)
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };


  const Global = async() => {
    const response = await axios.get(`${API_URL}/api/global?populate[navigation][populate]=*`);
    return response.data.data.attributes.navigation.Links;
  }
  const {data:navLinks} = useQuery('Nav', Global);



  return (
    <nav className="  flex z-10 items-center justify-between mq450:justify-between py-1 px-10 box-border  text-center text-4xl text-darkslategray-200 font-cormorant-garamond text-lg bg-[#053576]">
    <div className="flex  items-center justify-start gap-8 max-w-full">
      <img className='h-16 py-2 w-auto' src='https://api.ihfbyjavedkhan.com/uploads/ihf_logo_590d48d82a.png'/>
    </div>
    <div className="menu menu-5 mq925:hidden flex items-center justify-center gap-8">
      {navLinks && navLinks.map((nav) => (
        <ul key={nav.id} className="relative hover:text-#44444C text-yellow ">
          <li>
          <a  onClick={() => { navigate(`${nav.href}`) }}>
            {nav.label}
          </a>
          </li>
        </ul>
      ))}
    </div>
    <div className="mq925:hidden flex items-center justify-center gap-2">
      {!jwt  ?(
        <button className='btn' onClick={login}>Login</button>
      ):(
      <button className='btn' onClick={Signout}>Logout</button>
      )
    }

    </div>

    <div className=" items-center justify-end mq1825:hidden mq1250:hidden mq925:flex ">
      <button onClick={showDrawer} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={drawerVisible ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>

<ConfigProvider 
   theme={{
    token:{
      colorPrimary: '#17191c',
      colorText: '#C5C6C7',
      colorIcon: '#C5C6C7',
    },
    components: {
      Drawer:{
        colorBgElevated:'#17191c',
        colorBgMask:'#000000',
        colorText:'#C5C6C7',
        colorIcon:'#000000',
        colorTextDescription:'#000000',
        colorTextActive:'#C5C6C7',
        colorBgTextHover:'#000000',

      }
    },
  }}>

    <Drawer
      placement="right"
      closable={false}
      width='250px'
      onClose={onClose}
      visible={drawerVisible}
      className="text-white md:hidden  bg-gray1"
    >
          <div className="flex  items-center justify-start gap-8 max-w-full">
      <img className='h-16 py-4 w-auto' src='https://api.ihfbyjavedkhan.com/uploads/ihf_logo_590d48d82a.png'/>
    </div>
      {navLinks && navLinks.map((nav) => (
        <div key={nav.id} className="relative mb-3">
          <a className='text-white' onClick={() => { navigate(`${nav.href}`) }}>
            {nav.label}
          </a>
        </div>
      ))}
      <div className="">

      {!jwt || !Token ?(
        <button className='btn' onClick={login}>Login</button>
      ):(
      <button className='btn' onClick={Signout}>Logout</button>
      )
    }
    </div>
    </Drawer>
    </ConfigProvider>
  </nav>
  );
}

export default NavBar;

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Blogs from './pages/blogs/blogs'
import HomePage from './pages/homePage/homePage'
import MasterClasses from './pages/masterClasses/masterClasses'
import MyProfile from './pages/myProfile/myProfile'
import Contact from './pages/contact/contact'
import OnlineCourse from './pages/onlineCourses/onlineCourse'
import Login from './pages/login/login'
import GoogleCallBackAuth from './pages/login/GoogleCallBackAuth'
import Album from './pages/gallery/gallery'
import Details from './components/Details'
import Checkout from './components/Checkout'
import MasterDetails from './components/MasterDetails'
import ListOfvideo from './pages/onlineCourses/ListOfvideo'

const jwt = localStorage.getItem("JwtToken");
const AllRoutes = () => {
  return(
    <>
 <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/auth/google/callback' element={<GoogleCallBackAuth/>}/>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/masterclass' element={<MasterClasses/>}/>
    <Route path='/onlineCourse' element={<OnlineCourse/>}/>
    <Route path='/details/course/:id' element={<Details/>}/>
    <Route path='/masterDetails' element={<MasterDetails/>}/>
    <Route path='/gallery' element={<Album/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/myprofile' element={<MyProfile/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    <Route path='/individualCourse/:id' element={<ListOfvideo/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes
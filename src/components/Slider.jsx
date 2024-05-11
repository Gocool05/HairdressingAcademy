import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import 'swiper/css';
import './style.component.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from "axios";
import { useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;



const Slider = () => {
const [slider , setSlider] = useState([]);
const navigate = useNavigate();
    useEffect(() => {
        HomeSlider();
      }, []);

    const HomeSlider = async() => {
        try{
          const response = await axios.get(`${API_URL}/api/sliders?populate=*`);
          setSlider(response.data.data);
          console.log(response.data.data,'slider');
        }catch(e){
          console.error(e);
        }
      }
  return (
    <Swiper 
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper"
    >
{slider.map((slide)=>(
    <SwiperSlide key={slide.id}>
        <div className="slide-content">
          <img src={`${API_URL}${slide.attributes.Image.data.attributes.url}`} className="kenburns-bottom" alt="Slider Image 1" />
          <div className="overlays">
          <div className="overlays-content">
            <h2 className="flicker-1">{slide.attributes.Title}</h2>
            <p>{slide.attributes.Description}</p>
            <button className="btn bottom-4" onClick={()=>{navigate(`${slide.attributes.ButtonHref}`)}} >{slide.attributes.ButtonLabel}</button>
            <div class="iconSlider ">
            <a href=''> <i class="fa fa-facebook"></i></a>
            <a href=''> <i class="fa fa-instagram"></i></a>
            <a href=''> <i class="fa-brands fa-youtube"></i></a>
            <a href=''> <i class="fa-brands fa-x-twitter"></i></a>
            <a href=''> <i class="fa fa-linkedin"></i></a>
            </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
))}
  </Swiper>
  )
}

export default Slider
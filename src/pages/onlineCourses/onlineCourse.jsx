
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import './onlineCourse.css'
const API_URL = process.env.REACT_APP_API_URL;


const OnlineCourse = () => {

// const[courses , setCourses] = useState([]);
const[faq , setFaq] = useState([]);
const[courseCard , setCourseCard] = useState([]);
const[courseCardContent , setCourseCardContent] = useState([]);
const[headerBottom , setHeaderBottom] = useState([]);
const navigate = useNavigate();


  const Online = async() => {
    const response = await axios.get(`${API_URL}/api/categories?populate[courses][populate]=*`);
    return response.data.data;
  }
const {data:categories,isLoading,error} = useQuery('Online',Online);
console.log(categories, 'catorgories')
  const FAQ = async() =>{
    const response = await axios.get(`${API_URL}/api/faqs/1?populate=*`)
    return response.data.data.attributes.Faq;
  }
  const {data:faqs} = useQuery('faq',FAQ);
  console.log(faqs,'faqs');

  const handleOnclick =(path) =>{
    navigate(path);
    window.location.reload();
  }

  if (isLoading) return <div class="loader">Loading..<span></span></div>
if (error) return <div>An error occurred: {error.message}</div>;


  return (
    <div className='container overflow-x-hidden bg-bgwhite'>
      <NavBar/>
      <div className="divet-pb-module-wrapper">
    <div className="divet-pb-module">
      <div className="divet-pb-slide">
      <div className="heading-3-container mq925:py-5">
          <span className="heading-3-container1">
            <h1 className="text-[40px] mq925:text-[20px]">
            Online Courses
            </h1>
            <p className="hairdressing-academy text-xl mq925:leading-4 mq925:text-[10px]">In these courses, Javed presents various styles and techniques for creating stunning hair transformations. Each lesson is delivered in a step-by-step format to guide you through the process</p>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div className="self-stretch  flex flex-col items-center justify-start py-5  px-5  box-border gap-[1px] max-w-full z-[1] text-smi text-gray1">
           <div className="w-[751.1px] relative  flex items-center justify-center max-w-full shrink-0">
           Learn the newest techniques from the Godfather of Hair Design himself. Get 25 years of experience packed into the ultimate online masterclass!
             </div>
         </div>



         <div className='flex flex-col gap-5 relative'>
  {categories && categories.map((Type, index) => (
    <section 
      key={index} 
      className="relative flex flex-col items-start justify-start pt-0 px-0 box-border max-w-full shrink-0 mq975:pb-[23px] mq975:box-border mq1500:pb-9 mq1500:box-border"
    >   
      <h1 className='ml-[200px]'>{Type.attributes.Type}</h1>
      <div className="flex flex-row mq925:flex-col flex-wrap items-start justify-start py-1 px-[180px] mq450:px-5 gap-[20px] mq975:py-[57px] mq975:px-[10px] mq975:box-border">
        <>
          {Type.attributes.courses && Type.attributes.courses.data.map((card, index) => (
            <Link 
              to={'/details/course/' + card.id} 
              onClick={() => { handleOnclick('/details/course/' + card.id) }} 
              className='no-underline'
              key={card.id} // Move key here to the Link element
            >
              <div className="w-[400px] h-[350px] mq925:w-[100%] mq925:h-auto backdrop-blur-xl rounded-xl bg-opacity-90 bg-white drop-shadow-2xl backdrop-filter flex flex-col items-start justify-start pt-0 px-0 pb-[17.9px] box-border gap-5 text-left text-base text-gray1 font-open-sans">
                <img
                  className="self-stretch h-[250px] rounded-t-2xl bg-gradient-to-t from-black relative max-w-full overflow-hidden shrink-0 object-cover"
                  alt=""
                  src={`${API_URL}${card.attributes.CourseImage.data.attributes.url}`}
                />
                <div className="absolute flex bottom-24 p-2 right-1 z-50 bg-transparent text-white gap-1 justify-center items-center text-center"> 
                  <div className="justify-center items-center text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="font-semibold justify-center items-center mb-1 text-center">
                    {card.attributes.Price}
                  </div>
                </div>
                <div className="flex flex-row items-start justify-between py-0 px-5">
                  <div className="flex flex-col items-start justify-start gap-[1px]">
                    <div className="relative font-bold uppercase">
                      {card.attributes.CourseName}
                    </div>
                  </div>
                </div>
              </div> 
            </Link>
          ))}
        </>
      </div>
    </section>
  ))}

  <div className='relative flex flex-col items-start justify-start px-[150px] mq925:px-6 pb-[60.2px] box-border gap-5 shrink-0 max-w-full z-[1] text-left text-mid text-gray1 font-open-sans mq975:gap-[20px] mq975:pb-[25px] mq975:box-border mq1500:gap-[40px] mq1500:pb-[39px] mq1500:box-border'>
    <h1 className='text-gray1 mq925:justify-center'>Frequently Asked Questions</h1>
    {faqs && faqs.map((QA, index) => (
      <div className="w-[1075px] flex flex-col items-start justify-start gap-[0.8px] max-w-full shrink-0 text-smi text-dimgray-300" key={index}>
        <b className="relative leading-[24px]">{QA.Question} ?</b>
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[15px] box-border gap-[1px] max-w-full">
          <div className="self-stretch relative leading-[23.8px]">
            {QA.Answer}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      <Footer/>
    </div>
  )
}

export default OnlineCourse
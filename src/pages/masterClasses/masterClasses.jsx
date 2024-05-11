import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL;


const MasterClasses = () => {

  // const[courses , setCourses] = useState([]);
const[faq , setFaq] = useState([]);
const[courseCard , setCourseCard] = useState([]);
const[courseCardContent , setCourseCardContent] = useState([]);
const[headerBottom , setHeaderBottom] = useState([]);


const Master = async() => {
  const response = await axios.get(`${API_URL}/api/master-classes?populate[course][populate]=*`);
  return response.data.data;
}
const {data:courses,isLoading,error} =useQuery('Master',Master);


if (isLoading) return <div class="loader">Loading..<span></span></div>
if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className='container bg-black'>
      <NavBar/>
      <div className="divet-pb-module-wrapper">
    <div className="divet-pb-module">
    <div className="divet-pb-slide">
      <div className="heading-3-container mq925:py-5">
          <span className="heading-3-container1">
            <h1 className="text-[40px] mq925:text-[20px]">
            Online Masterclasses
            </h1>
            <p className="hairdressing-academy text-xl mq925:leading-4 mq925:text-[10px]">The Masterclass offers a range of styles and techniques for creating beautiful hair transformations, as well as valuable business advancement advice from the Master Javed</p>
          </span>
        </div>
      </div>
    </div>
  </div>
      <div className="self-stretch  flex flex-col items-center justify-start pt-[27.1px] px-5 pb-[27.9px] box-border gap-[1px] max-w-full z-[1] text-smi text-dimgray-200">
        <div className="w-[751.1px] relative leading-[23.8px] flex items-center justify-center max-w-full shrink-0">
          {headerBottom}
          </div>
      </div>

      <section className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-[86.5px] box-border max-w-full shrink-0 mq975:pb-[23px] mq975:box-border mq1500:pb-9 mq1500:box-border">
        <div className="self-stretch  flex flex-row flex-wrap items-start justify-start py-[87px] px-[180px] mq450:px-10 shrink-0 [debug_commit:1de1738] gap-[20px] mq975:py-[57px] mq975:px-[105px] mq975:box-border">
       
       {courses && courses.map((card)=>(
        
 <Link to={'/details/course/'+card.attributes.course.data.id} className='no-underline'>
 <div key={card.id} className="w-[400px] h-[390px] mq925:w-[100%] mq925:h-auto backdrop-blur-xl rounded-xl bg-opacity-90 bg-gray1 backdrop-filter flex flex-col items-start justify-start pt-0 px-0 pb-[17.9px] box-border gap-[19.6px] text-left text-base text-white font-open-sans">
 <img
   className="self-stretch h-[200px] relative max-w-full overflow-hidden shrink-0 object-cover"
   alt=""
   src={`${API_URL}${card.attributes.course.data.attributes.CourseImage.data.attributes.url}`}
 />
 <div className="flex flex-row items-start justify-start py-0 px-5">
   <div className="flex flex-col items-start justify-start gap-[1px]">
     <div className="relative leading-[27.2px] uppercase">
       {card.attributes.course.data.attributes.CourseName}
     </div>
   </div>
 </div>
 <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[29px] pl-5 text-white font-cormorant-garamond">
   <div className="flex-1 flex flex-col items-start justify-start gap-[9px]">
     <div className="flex flex-row items-center justify-start gap-[9.6px]">
       <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
         <div className="relative leading-[16px] uppercase inline-block min-w-[16.4px] shrink-0 [debug_commit:1de1738]">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
</svg>
         </div>
       </div>
       <div className="relative leading-[24px] uppercase font-semibold font-open-sans text-white inline-block min-w-[128px] shrink-0 [debug_commit:1de1738]">
         enrol anytime
       </div>
     </div>
     <div className="self-stretch flex flex-col items-start justify-start gap-[1.2px] text-smi text-white font-open-sans">
       <div className="w-[39px] flex flex-row items-center justify-start gap-[6px] text-base text-dimgray-100 font-cormorant-garamond">
         <div className="flex-1 flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
           <div className="relative leading-[16px] uppercase inline-block min-w-[13px]">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
           </div>
         </div>
         <div className="relative leading-[24px] uppercase font-semibold font-open-sans text-white inline-block min-w-[19px]">
           {card.attributes.course.data.attributes.Price}
         </div>
       </div>
     </div>
   </div>
 </div>
</div> 
</Link>
       ))}
        </div>
        
      </section>
      <Footer/>
    </div>
  )
}

export default MasterClasses
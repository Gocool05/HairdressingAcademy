import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import DivetPbBlurbContent from './DivetPbBlurbContent'
import './homePage.css'
import Slider from '../../components/Slider'
const API_URL = process.env.REACT_APP_API_URL;



const HomePage = () => {
  const navigate = useNavigate();
  const [cards , setCards] = useState([]);
  const [about , setAbout] = useState([]);
  const [benifits, setBenifits] = useState([]);
  const [benifitsImage, setBenifitsImage] = useState([]);
  const [description, setDescription] = useState([]);
  const [AbtDesc, setAbtDesc] = useState([]);
  const [abtCard, setAbtCard] = useState([]);
  const [abtImage, setAbtImage] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  Home();
}, []);

var isValid = cards && about && benifits && description && AbtDesc && abtCard;
console.log(isValid);

const Home = async() => {
  try{
    try{
      const response = await axios.get(`${API_URL}/api/pages/1?populate[0]=BenefitsOfIHF&populate[1]=BenefitsOfIHF.Image`);
      setBenifits(response.data.data.attributes.BenefitsOfIHF);
      setBenifitsImage(response.data.data.attributes.BenefitsOfIHF.Image.data.attributes.url);
      setDescription(response.data.data.attributes.BenefitsOfIHF.Description[0].children);
      console.log(benifits,'benifits');
    }catch(e){
      console.error(e);
    }
    try{
      const response = await axios.get(`${API_URL}/api/pages/1?populate[cards][populate]=*`);
      setCards(response.data.data.attributes.cards);
      console.log(response.data,'Home');
    }catch(e){
      console.error(e);
    }

    try{
      const response = await axios.get(`${API_URL}/api/pages/1?populate[blocks][populate]=*`);
      setLoading(false);
      setAbout(response.data.data.attributes.blocks[2]);
      setAbtCard(response.data.data.attributes.blocks);
      setAbtImage(response.data.data.attributes.blocks[2].Image.data.attributes.url);
      // setAbtCard(abtCard.slice(-3));
      setAbtDesc(response.data.data.attributes.blocks[2].Description[0].children);
      console.log(abtCard,'Blocks');
    }catch(e){
      console.error(e);
    }
  }catch(err){

  }
 
}

  return (
    <>
      {loading?(
        <div class="loader">Loading
  <span></span>
</div>
      ):(
        <div className="overflow-x-hidden bg-black">
      <NavBar/>
    <Slider/> 
    <div className="self-stretch  flex flex-col items-center justify-start pt-[27.1px] px-5 pb-[27.9px] box-border gap-[1px] max-w-full z-[1] text-smi text-dimgray-200">
           <div className="w-[751.1px] relative leading-[23.8px] flex items-center justify-center max-w-full shrink-0">
           Learn the newest techniques from the Godfather of Hair Design himself. Get 25 years of experience packed into the ultimate online masterclass!
             </div>
         </div>
       <main className="frame-parent mt-[7em] mx-9">
       <section className="self-stretch flex flex-col mq925:px-0 items-center justify-center pt-0 px-0 pb-10 box-border max-w-full">
       {/* <div className=" flex flex-col items-center justify-center  box-border  max-w-full shrink-0 text-left text-6xl text-[#C5C6C7]  mq925:gap-[20px] mq925:pt-[42px] mq925:px-[25px] mq925:pb-[25px] mq925:box-border mq1350:pt-[65px] mq1350:px-[210px] mq1350:pb-[39px] mq1350:box-border"> */}
         <div className=" flex flex-row items-center  justify-evenly px-[150px]  mq925:flex mq925:flex-col  gap-11 max-w-full mq925:gap-[30px] ">
           <img
             className="h- flex-1 opacity-80 relative max-w-full rounded-xl overflow-hidden object-cover min-w-[300px]  mq925:min-w-[331px]"
             alt=""
             src={`${API_URL}${abtImage}`}
           />
           {/* <div className=" flex flex-col items-start justify-start gap-[15px] min-w-[498.7px] max-w-full  "> */}
             <div className="flex flex-col items-start justify-start ">
               <h2 className="m-0 relative ml-7 uppercase font-normal text-white  mq450:text-xl mq450:leading-[40px]">
                 {about.Title}
               </h2>
   
               <div className=" flex flex-col text-justify   text-white">
                {AbtDesc.map((abt)=>(
                 <ul className="relative max-w-fit">
                   <li className="m-0">
                     {abt.children[0].text}
                   </li>
                 </ul>
                ))} 
   
               </div>
             </div>
           </div>
         {/* </div> */}
   
   
         <div className="self-stretch flex flex-column items-start justify-center px-[150px] mq925:px-0 py-11 box-border max-w-full shrink-0 z-[1] mt-[-0.1px] text-center text-lg text-darkslategray-200 font-open-sans mq925:pb-[39px] mq925:box-border">
     <div className="w-auto grid grid-cols-3 gap-[5em] max-w-full mq450:pt-[60px] mq450:pb-[26px] mq450:box-border mq925:gap-[30px] mq925:justify-center mq925:grid-cols-[minmax(240px,_1fr)]">
       {abtCard.slice(-3).map((card) => (
         <div key={card.id} className="h-[371px] backdrop-blur-sm bg-white rounded-xl  flex flex-row items-start justify-start pt-2.5 px-2.5 pb-5 box-border max-w-full">
           <div className="self-stretch flex-1 flex flex-col items-end justify-start pt-0 px-[0.2px] pb-2.5 gap-[30px]">
             <img
               className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover"
               alt=""
               src={`${API_URL}${card.Image.data.attributes.url}`}
             />
             <div className="self-stretch flex flex-row items-start justify-end py-0  mq450:pl-5 mq450:pr-5 mq450:box-border">
               <div className="flex-1 relative leading-[18px] uppercase text-gray1">
                 {card.Title}
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
       {/* </div> */}
           </section>
           <section className="value-comparator">
         <div className="input-filter-parent mq925:px-0">
             <div className="input-filter" >
             <h2 className="heading-31 text-[#C5C6C7]">{benifits.Title}</h2>
             <div className='justify-between flex gap-10 '>
               <div className="we-allow-students-more-one-on-parent flex flex-col" >
             {description.map((ben)=>(
               <ul className="we-allow-students-container">
                 <li className="we-allow-students ">
                 {ben.children[0].text}
                 </li>
               </ul>
           ))}
           </div> 
            <img
             className="benifits-img "
             alt=""
             src={`${API_URL}${benifitsImage}`}
           />
             </div>
           </div>
         </div>
       </section>
       <section className="divet-pb-row-wrapper">
         <div className="divet-pb-row ">
           {cards.map((card)=>(
             <div  className="divet-pb-blurb-content1 " key={card.id}>
               <a onClick={()=>{navigate(`${card.href}`)} }>
             <img
               className="link-events-300x300png"
               loading="lazy"
               alt=""
               src={`${API_URL}${card.Image.data.attributes.url}`}/>
             <div className="heading-4-link-masterclass-wrapper">
               <div className="heading-4-container">
                 <p className="masterclasses-online py-[10px]">{card.Title}</p>
               </div>
             </div>
           </a>
           </div>
           ))}
           </div>
       </section>
       </main>
       <Footer/>
     </div>
      )}
      </>
  )
}

export default HomePage
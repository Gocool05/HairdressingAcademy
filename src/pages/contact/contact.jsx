import React from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import NavBar from "../../components/NavBar"
import "./contact.css"

const Contact = () => {
  const map = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Land+Marvel+Residential+Flat+Owners+Associations+Ashok+Nagar+Chennai+600083" width="300" height="300" frameborder="0" style="border:0;'
  return (
    <>
    <NavBar/>
      <section className='contacts  px-14 py-14 flex gap-5 mq925:px-6 mq925:flex-col'>
          <div className='left flex w-[50%] mq925:w-full'>
            <iframe className="w-full" src={map}></iframe>
          </div>
          <div className=' right items-start justify-start w-[50%] mq925:w-full'>
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>

            <div className='items grid2'>
              <div className='box'>
                <h4 className="text-white">ADDRESS:</h4>
                <p>F1, 2nd FloorLand Marvel Residential Flat Owners Association, Ashok Nagar, Chennai-600 083.</p>
              </div>
              <div className='box'>
                <h4 className="text-white">EMAIL:</h4>
                <p> brightfuturefilmtechacademy@ gmail.com</p>
              </div>
              <div className='box'>
                <h4 className="text-white">PHONE:</h4>
                <p>+91 93422 54626</p>
                <p>+91 044-35773187</p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB flex gap-4 w-[93%] mq925:flex-col mq925:w-full mq925:gap-0'>
                <input type='text' placeholder='Name'  />
                <input type='email' placeholder='Email' />
              </div>
              <input type='text' placeholder='Subject' />
              <textarea cols='30' rows='5'>
                Create a message here...
              </textarea>
              <button className='btn'>SEND MESSAGE</button>
            </form>
          </div>
      </section>
      <Footer/>
    </>
  )
}

export default Contact

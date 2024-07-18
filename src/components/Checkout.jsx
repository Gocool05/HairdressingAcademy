import axios from "axios";
import React, { useEffect, useState } from "react";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
import "./style.component.css";
const API_URL = process.env.REACT_APP_API_URL;
let JWT ;
setTimeout(()=>{
  JWT = localStorage.getItem("JwtToken");
},1000)

const Checkout = () => {
    const [price , setPrice]= useState(0);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();

    const getCart = async() =>{
        const response = await axios.get(`${API_URL}/api/carts/${id}?populate[courses][populate]=*`)
        return response.data.data.attributes.courses.data;
    }
    const { data:carts,isLoading,error} = useQuery('cartData', getCart);

    const ContinueLearning = () =>{
      navigate('/onlineCourse')
    }

    const removeCartItem =async(courseId)=>{
        const response = await axios.put(`${API_URL}/api/carts/${id}`,{
            data:{
                courses:{
                    disconnect:[courseId]
                }
            }
        } )
        queryClient.invalidateQueries('cartData');
    }
    const calculateTotalPrice = async () => {
        let totalPrice = 0; 
        carts && carts.length > 0 && carts.map(item => {
          totalPrice += Number(item.attributes.Price);
        });
        setPrice(totalPrice);
    };
    console.log(price,'price');

      useEffect(()=>{
        calculateTotalPrice();
      },[carts])

    console.log('cart checkout',carts )

    const option1 = {
      headers: {
      'Authorization':`Bearer ${JWT}`
      },
    }

    const handlePayment = async(e)=>{
      e.preventDefault();
        console.log(price,'Amount');
        var options = {
          key: 'rzp_test_RJ6nR06W2Bz9gm',
          key_secret:'RxH5iAhnwIUuvvWwJhRGKKU5',
          amount: price *100,
          currency:"INR",
          name:"IHF by javed khan",
          config: {
            display: {
              blocks: {
                banks: {
                  name: 'All payment methods',
                  instruments: [
                    {
                      method: 'upi',
                    },
                    {
                      method: 'card'
                    },
                    {
                        method: 'wallet'
                    },
                    {
                        method: 'netbanking'
                    },
                  ],
                },
              },
              sequence: ['block.banks'],
              preferences: {
                show_default_blocks: false
              },
            },
          },
          handler:  async function (Paymentresponse){
            const response = await axios.post( `${API_URL}/api/cart/${Paymentresponse.razorpay_payment_id}/${id}/payment`,{},option1);
          navigate('/')
          },
        };
        var pay = new window.Razorpay(options);
        pay.open();
      }


console.log(carts, 'checking carts ')


      if (isLoading) return <div class="loader">Fetching..<span></span></div>
      if (error) return <section class="flex items-center h-screen p-16 ">
      <div class="container flex flex-col items-center ">
          <div class="flex flex-col gap-2 max-w-md text-center">
              <h1 class="font-extrabold text-[5rem] my-0 p-0 text-white">
                404
              </h1>
              <p class="text-2xl my-0 text-white">Sorry, we couldn't find this page.</p>
              <a href="/" class="btn">Back to home</a>
          </div>
      </div>
    </section>;
  return (
    <>
    <NavBar/>
    {carts[0] ? (
<div className="h-screen bg-bgwhite" >
        <div id="main-content" className="flex items-center max-h-screen justify-center pt-20  text-gray1">
      <div id="content-area" className="flex mq925:flex-wrap gap-10 mq925:gap-1 ">
        <div id="left-area" className="w-[60%] mq925:w-full mq925:m-7 bg-white drop-shadow-2xl p-6 rounded-lg">
          <h1 className="main-title">Basket</h1>
          <div className="entry-content">
            <div className="cart-items">
              <table className="cart-items-table">
                <thead>
                  <tr className="cart-items-header">
                    <th className="text-left"><span>Product</span></th>
                    <th><span>Total</span></th>
                  </tr>
                </thead>
                <tbody >
                 {carts && carts.map((cart, index)=>(
                  <tr className="cart-item " key={index}>
                    <td className="flex gap-8 mt-6">
                      <img className="h-[80px] w-[80px]" src={`${API_URL}${cart.attributes.CourseImage.data.attributes.url}`} alt={`${cart.attributes.CourseName}`} />
                      <div className="cart-item-details">
                        <span>{cart.attributes.CourseName}</span>
                        <div className="cart-item-price ">
                          <span>₹{cart.attributes.Price}</span>
                        </div>
                        <div className="cart-item-description">
                          <p>{cart.attributes.CheckoutLabel}</p>
                        </div>
                        <div className="cart-item-actions">
                          <button aria-label="Remove Full Cutting Package from basket" className="btn1" onClick={() => removeCartItem(cart.id)} >Remove item</button>
                        </div>
                      </div>
                    </td>
                    <td><span>₹{cart.attributes.Price}</span></td>
                  </tr>
                 ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className=" w-[30%] max-h-max mq925:w-full mq925:m-7">
          <div className="cart-totals flex flex-col  justify-between gap-9 bg-white drop-shadow-2xl p-6 rounded-lg">
            <div className="basket-totals">
              <h2 className="basket-totals-heading">Basket totals</h2>
             
             {carts && carts.map((cart, index)=>(
             <div className="basket-subtotal flex items-center justify-between ">
                <div className="mb-4" >{cart.attributes.CourseName}</div>
                <div className="text-right">₹{cart.attributes.Price}</div>
              </div>
             ))} 

              <hr className="border-t-2 text-white"></hr>
              <div className="basket-total flex justify-between">
                <div>Total</div>
                <div> ₹{price}</div>
              </div>
            </div>
            <button onClick={handlePayment} className=" btn1  mb-3 bg">
            Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
  </div>
  </div> 
   ): (
    <div className="flex flex-col justify-center items-center"> 
        <h1 className=" text-white items-center justify-center text-center">Your cart is Empty</h1>
       <div className="flex mb-5">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-[200px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
        </div> 
        <button className="btn justify-center items-center mb-10" onClick={ContinueLearning}>Continue Learning</button>
    </div>

    )} 
    
  <Footer/>
  </>
  );
};

export default Checkout;

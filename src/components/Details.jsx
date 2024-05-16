import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./NavBar";
const API_URL = process.env.REACT_APP_API_URL;
const JWT = localStorage.getItem("JwtToken");
// Details changed 
const Details = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [Desc, setDesc] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [learn, setLearn] = useState([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [courseInCart, setCourseInCart] = useState(false);
  const [isBought, setIsBought] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [purchasedId, setPurchasedId] = useState(null);
  const userId = localStorage.getItem("UserId");


  
if(localStorage.getItem('redirectToCart')){
  localStorage.removeItem('redirectToCart')
  window.location.reload();
}

  const User = async () => {
    const response = await axios.get(
      `${API_URL}/api/users/${userId}?populate[cart][populate]=*`
    );
    return response.data.cart;
  };

  const { data: cart } = useQuery("Cart", User);

  console.log(cart, "Users details");
 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/courses/${id}?populate=*`
      );
      const responseData = response.data.data;
      setCourse(responseData.attributes);
      // console.log("course details ",course);
      setDesc(response.data.data.attributes.Description);
      setImage(response.data.data.attributes.CourseImage.data.attributes.url);
      setVideo(response.data.data.attributes.CourseVideo.data.attributes.url);
      setLearn(response.data.data.attributes.WhatYouWillLearn);
      setUpdatedAt(response.data.data.attributes.updatedAt);
      localStorage.removeItem("redirectToCart");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(course, "Courses updated");

  const addToCart = async () => {
    if (JWT) {
      if (cart) {
        try {
          const response = await axios.put(`${API_URL}/api/carts/${cart.id}`, {
            data: {
              courses: {
                connect: [id],
              },
            },
          });
          console.log(response, "cartUpdated");
          queryClient.invalidateQueries("Cart");
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const response = await axios.post(`${API_URL}/api/carts`, {
            data: {
              courses: {
                connect: [id],
              },
              user: userId,
            },
          });
          queryClient.invalidateQueries("Cart");
          console.log(response, "cartCreated");
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      localStorage.setItem("redirectToCart", window.location.pathname);
      navigate("/login");
    }
  };

  const isCartEmpty = async () => {
    console.log("id:", id);
    console.log("cartCourses:", cart);
    if (cart && cart.courses && cart.courses.length > 0) {
      const isLiked = cart.courses.map(
        (course) => course.id.toString() === id.toString()
      );
      
      const anyLiked = isLiked.includes(true);
      if (anyLiked) {
        queryClient.invalidateQueries("Cart");
        setCourseInCart(true);
        console.log("courseincart", courseInCart);
      }
    } else {
      console.log("Cart is empty");
    }
  };

  const PurchasedCourse = async () => {
    const response = await axios.get(
      `${API_URL}/api/users/${userId}?populate[purchased_course][populate]=*`
    );
    if(response.data.purchased_course){
      return response.data.purchased_course.courses;
    }
  };
  const { data: purchasedCourse,isLoading,error } = useQuery(
    "PurchasedCourse",
    PurchasedCourse
  );
  console.log(purchasedCourse, "PurchasedCourse");

  const LessonPlan = async() =>{
    const response = await axios.get(`${API_URL}/api/courses/${id}?populate[LessonPlan][populate]=*`);
    return response.data.data.attributes.LessonPlan;
  }
  const { data: lessonPlan } = useQuery(
    "LessonPlan",
    LessonPlan
  );
  console.log(lessonPlan, "LessonPlan");

  const isPurchased = () => {
    if (
      purchasedCourse &&
      purchasedCourse.length > 0
      ) {
        const isPurchase = purchasedCourse.map(course => course.id.toString() === id.toString());
        console.log(isPurchase, "purchasedCourse is true or not");
        console.log(id,'course ID');
        const anyLiked = isPurchase.includes(true);
        if (anyLiked) {
        // queryClient.invalidateQueries("PurchasedCourse");
        setIsBought(true);
        console.log(isBought, "isBoughtCourse is true or not");
      }
    } else {
      console.log("NO courses purchased");
    }
  };
  
  useEffect(() => {
    isPurchased();
  }, [purchasedCourse]);
    
  const handlePlay = () => {
    if (isBought) {
      setIsPlaying(true);
    } else {
      // Implement logic to prompt user to make payment
      alert("Please make a payment to unlock the video.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    isCartEmpty();
  }, [cart]);

 
  if (isLoading)
    return (
      <div class="loader">
        Fetching..<span></span>
      </div>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <NavBar />
      <div className="w-full relative bg-[#D6D6D6] flex flex-row items-start justify-center py-0 px-5 box-border leading-[normal] tracking-[normal]">
        <section className="w-[1320px] flex flex-col items-start justify-start  max-w-[1320px] text-left text-xl text-thelondonhairdressingacademycom-shark font-htmlbeanscom-open-sans-regular-14 mq800:gap-[22px] mq1350:max-w-full">
          <h1 className="text-gray1 pl-3">{course.CourseName}</h1>
          <div className="ml-[-12px] w-[1344px] flex flex-row mq925:flex-col items-start gap-12 justify-start max-w-[102%] shrink-0 mq1150:flex-wrap">
            <div className="flex-1 flex flex-col items-start justify-start py-0 px-6 box-border  max-w-[1344px] mq800:min-w-full mq450:gap-[16px] gap-[31px] mq1350:max-w-full">
              <div className="w-full">
                {isPlaying ? (
                  <video
                    className="w-full h-[400px] mq925:aspect-video relative overflow-hidden shrink-0 object-cover"
                    controls
                    autoPlay
                  >
                    <source src={`${API_URL}${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="relative">
                    <img
                      className="w-full h-[400px] rounded-2xl opacity-95 mq925:aspect-video mq925:h-[200px] relative  object-cover"
                      alt=""
                      src={`${API_URL}${image}`}
                    />
                    {isBought ? (
                      <button
                        className="absolute rounded-[50%] p-3 bg-gray1 cursor-pointer  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        onClick={handlePlay}
                      >
                        <div>{console.log(isBought, "Isbought in play")}</div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-10 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="absolute rounded-[50%]  p-3 bg-gray1 top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        onClick={handlePlay}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-10 text-white "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="self-stretch h-[589.2px] flex flex-col items-start justify-start pt-0 px-0  box-border gap-[32px] max-w-full  mq450:gap-[16px]  mq450:box-border  mq1150:box-border">
                <div className="self-stretch flex flex-col items-start justify-start gap-[11.2px] shrink-0">
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-2.5">
                    <h2 className="self-stretch m-0 relative text-gray1 leading-[32px] mq450:text-base mq450:leading-[26px]">
                      About Course
                    </h2>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-[0.8px] pr-[3px] pl-0 text-base text-gray1">
                    {Desc.map((desc, index) => (
                      <div
                        key={index}
                        className="self-stretch flex flex-row  items-start justify-start shrink-0"
                      >
                        {desc.children.map((child, index) => (
                          <p className="m-0 ml-5 mb-2" key={index}>
                            ↦ {child.text}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start mq925:hidden gap-[11.2px] shrink-0">
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-2.5">
                    <h2 className="self-stretch m-0 relative text-gray1 leading-[32px] mq450:text-base mq450:leading-[26px]">
                      What Will You Learn?
                    </h2>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start pt-0 pb-[0.8px] pr-[3px] pl-0 text-base text-gray1">
                    {learn.map((L, index) => (
                      <div
                        key={index}
                        className="self-stretch flex flex-row  items-start justify-start shrink-0"
                      >
                        {L.children.map((child, index) => (
                          <p className="m-0 ml-5 mb-2" key={index}>
                            ↦ {child.text}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[448px] flex   flex-col items-start justify-start  px-6 pb-[359.3px] text-gray1 box-border gap-[24px]  text-5xl mq800:pb-[152px] mq800:box-border mq800:min-w-full mq1150:w-full mq1350:pb-[234px] mq1350:box-border mq1350:max-w-full">
              <div className="self-stretch rounded-md bg-white flex flex-col items-start justify-start pt-0 px-0 pb-px drop-shadow-2xl ">
                {isBought ? (
                  <div className="flex flex-col min-w-full gap-2 mt-4 mb-4 items-center justify-center pt-0 px-0 pb-[0.7px]">
                    <h1 className="relative w-full m-0  text-gray1 text-center items-center justify-center">
                      keep Learing...
                    </h1>
                    <button
                      className="btn"
                      onClick={() => {
                        navigate("/onlineCourse");
                      }}
                    >
                      View Courses
                    </button>
                  </div>
                ) : (
                  <div className="self-stretch rounded-t-md rounded-b-none bg-thelondonhairdressingacademycom-aqua-haze flex flex-col items-start justify-start pt-8 px-8 pb-[31.2px] gap-[24px]">
                    <div className="self-stretch h-[38.4px] flex flex-row items-end justify-start pt-0 px-0 pb-0 box-border">
                      <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[0.7px]">
                        <b className="relative text-gray1 leading-[39px] inline-block min-w-[76px] whitespace-nowrap mq450:text-lgi mq450:leading-[31px]">
                          ₹ {course.Price}
                        </b>
                      </div>
                    </div>
                    {courseInCart ? (
                      <Link
                        to={"/checkout/" + cart.id}
                        className="no-underline"
                      >
                        {" "}
                        <button className="cursor-pointer py-[9px] px-5 bg-gray1 text-white self-stretch rounded-md flex flex-row items-center justify-center border-[1px] border-solid ">
                          View Cart
                        </button>{" "}
                      </Link>
                    ) : (
                      <button
                        onClick={addToCart}
                        className="cursor-pointer py-[9px] px-5 bg-gray1 text-white self-stretch rounded-md flex flex-row items-center justify-center border-[1px] border-solid "
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                )}

                <div className="self-stretch rounded-t-none  rounded-b-8xs flex flex-col items-start text-gray1 justify-start pt-[23px] px-8 pb-6 text-base text-thelondonhairdressingacademycom-mako border-t-[1px] border-solid border-thelondonhairdressingacademycom-ghost">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[11.2px]">
                    <div className="self-stretch flex flex-row items-end justify-start py-0 pr-[239px] pl-0 mq450:pr-5 mq450:box-border">
                      <div className="flex flex-col items-start justify-center pt-[4.2px] pb-[0.2px] pr-3 pl-0">
                        <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[7.6px]">
                          <div className="flex flex-row items-start justify-start">
                            <div className="h-3.5 w-3.5 relative overflow-hidden shrink-0" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="relative leading-[26px] inline-block min-w-[69px]">
                          All Levels
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-end justify-start py-0 pr-[78px] pl-0 [row-gap:20px] mq450:flex-wrap mq450:pr-5 mq450:box-border">
                      <div className="flex flex-col items-start justify-center pt-[4.2px] pb-[0.2px] pr-3 pl-0">
                        <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[7.6px]">
                          <div className="flex flex-row items-start justify-start">
                            <div className="h-3.5 w-3.5 relative overflow-hidden shrink-0" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-start justify-start min-w-[149px]">
                        <div className="relative leading-[26px]">
                          {updatedAt.substring(0, 10)} Last Updated
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-row items-end justify-start py-0 pr-[124px] pl-0 mq450:pr-5 mq450:box-border">
                      <div className="flex flex-col items-start justify-center pt-[4.2px] pb-[0.2px] pr-3 pl-0">
                        <div className="flex flex-col items-start justify-start pt-0 px-0 pb-[7.6px]">
                          <div className="flex flex-row items-start justify-start">
                            <div className="h-3.5 w-3.5 relative overflow-hidden shrink-0" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <div className="relative leading-[26px]">
                          Certificate of completion
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch  flex flex-col items-start bg-white justify-start max-w-full text-base text-gray1">
                <h2 className="px-5 m-0 mt-3">Lesson Plan</h2>
                      {lessonPlan && lessonPlan.map((plan, index)=>(
                <ul class="m-0 px-5 py-2 list-none min-w-[90%]" key={index}>
                  <li className="drop-shadow-2xl bg-white mb-2  ">
                    <details class="group">
                      <summary class="flex items-center gap-3 px-4 py-3 justify-between font-medium marker:content-none hover:cursor-pointer">
                        <span>{plan.Topic}</span>
                        <span class="transition group-open:rotate-180">
                          <svg
                            className="h-6 "
                            fill="none"
                            height="24"
                            shape-rendering="geometricPrecision"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>

                      <article class="px-4 pb-4 flex">
                        <img
                          className="w-full h-[200px] rounded-2xl opacity-95 mq925:aspect-video mq925:h-[200px] relative  object-cover"
                          alt=""
                          src={`${API_URL}${plan.Cover.data.attributes.url}`}
                        />
                        <div className="absolute flex bottom- p-2  z-50 bg-gray1  rounder-lg text-white gap-1 justify-center items-center text-center ">
                          <div className="justify-center items-center text-center ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className=" font-semibold justify-center items-center mb-1 text-center  ">
                           {plan.TimeStamp.substring(0,5)}
                          </div>
                        </div>
                      </article>
                    </details>
                  </li>
                </ul>
                      ))}


              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Details;

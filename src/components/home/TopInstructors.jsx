import { Parallax } from 'react-parallax';
import instructorsImg from '../../assets/instructors.jpg'
import axios from 'axios';
import { useEffect, useState } from 'react';
// // import { MdOutlineNavigateNext,MdOutlineNavigatePrev } from "react-icons/md";
// import { FaAngleLeft,FaAngleRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation, Pagination } from "swiper";
import { Fade, Slide, Zoom } from 'react-awesome-reveal';


const TopInstructors = () => {
    const [instructors,setInstructors] = useState();

    useEffect(()=>{
        axios.get('https://newspro-server.vercel.app/top-instructors')
        .then(res=>{
            setInstructors(res.data);
        })
    },[]);

    return (
        <div>
            {/* <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={instructorsImg}
                bgImageAlt="the dog"
                strength={200}
            >
                <div className='h-screen flex items-center' >
                    {instructors && <Swiper
                        breakpoints={{
                            // when window width is >= 640px
                            0:{
                                slidesPerView: 1
                                // spaceBetween:10
                            },
                            400: {
                                slidesPerView: 2
                                
                            },
                            768: {
                                slidesPerView: 3
                            },
                            1080:{
                                slidesPerView: 4
                            }
                        }}
                        
                        spaceBetween={20}
                        centeredSlides={true}
                        navigation={true}
                        mousewheel={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {instructors.map((instructor,index)=><SwiperSlide key={index}>
                            <div className='w-[250px] h-[320px] border-2 border-white rounded-xl overflow-hidden relative'>
                                <img className='w-full h-full object-cover object-center' src={instructor.photoUrl} alt="" />
                                <div className='border border-red-600 p-5 absolute bg-black bg-opacity-60 opacity-0 hover:opacity-100 duration-300 inset-0'>
                                    <p className='text-4xl text-gray-200'>{instructor.name}</p>
                                    <p className='text-xs text-gray-200'>{instructor.email}</p>
                                    <button className='text-gray-200 border-2 rounded-full absolute bottom-0 z-20 left-1/2 -translate-x-1/2 px-5 py-2'>Details</button>
                                    
                                </div>
                            </div>
                        </SwiperSlide>)}
                        
                    </Swiper>}
                    
                </div>
            </Parallax> */}
            <Fade delay={300} duration={1000}>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                    
                    <div className='w-full px-3'>
                        {/* <Fade duration={1000} delay={200}>
                            <h1 className='text-6xl font-bold text-left md:tracking-wider'>Meet Our Exceptional Instructors</h1>
                        </Fade> */}
                        <Slide duration={1000}>
                            <h1 className='text-6xl font-bold text-left md:tracking-wider text-primary'>Meet Our Exceptional Instructors</h1>
                        </Slide>
                        <p className='md:w-[90%] text-sm text-gray-500 text-justify mt-8 tracking-widest'>
                            Our top-notch instructors bring a wealth of knowledge and expertise to the table. With years of experience in their respective fields, they are passionate about guiding and inspiring students on their learning journey. From industry veterans to accomplished scholars, our instructors are dedicated to creating an engaging and supportive environment that fosters growth and success. Join our classes and learn from the very best!
                        </p>
                        <button className="bg-primary text-white px-5 py-3 rounded-md font-bold text-sm hover:bg-white border-2 border-primary hover:text-primary duration-100 cursor-pointer font-merri normal-case tracking-widest block w-fit mt-20">See All Instructors</button>
                    </div>
                    <div className='w-full self-center'>
                        {
                            instructors && <div>
                                {instructors && <Swiper
                                breakpoints={{
                                    // when window width is >= 640px
                                    0:{
                                        slidesPerView: 1,
                                        // spaceBetween:5
                                    },
                                    450: {
                                        slidesPerView: 2
                                        
                                    },
                                }}
                                
                                // spaceBetween={40}
                                slidesPerView={2}
                                centeredSlides={true}
                                navigation={true}
                                mousewheel={true}
                                modules={[Navigation]}
                                className="mySwiper"
                            >
                                {instructors.map((instructor,index)=><SwiperSlide key={index}>
                                    <div className='w-[250px] h-[320px] border-2 border-white rounded-xl overflow-hidden relative'>
                                        <img className='w-full h-full object-cover object-center' src={instructor.photoUrl} alt="" />
                                        <div className='p-5 absolute bg-black bg-opacity-60 opacity-0 hover:opacity-100 duration-300 inset-0'>
                                            <p className='text-4xl text-gray-200'>{instructor.name}</p>
                                            <p className='text-xs text-gray-200'>{instructor.email}</p>
                                            <button className='text-gray-200 border-2 rounded-full absolute bottom-0 z-20 left-1/2 -translate-x-1/2 px-5 py-2'>Details</button>
                                            
                                        </div>
                                    </div>
                                </SwiperSlide>)}
                                
                            </Swiper>}
                            </div>  
                        }
                    </div>
                </div>
            </Fade>
            
        </div>
    );
};

export default TopInstructors;

{/* <div className='absolute bottom-4 z-20 left-1/2 -translate-x-1/2 flex w-fit justify-center items-center gap-5'>
                        <FaAngleLeft className='text-5xl text-gray-200 border-2 rounded-full'></FaAngleLeft>
                        <FaAngleRight className='text-5xl text-gray-200 border-2 rounded-full'></FaAngleRight>
                    </div> */}
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
// import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper";

import courses from '../../assets/carousel/courses.jpg'
import opportunity from '../../assets/carousel/opportunity.jpg'
import instructor from '../../assets/carousel/instructor.jpg'

const Carousel = () => {
    return (
        <div>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                speed={1500}
                autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                }}
                pagination={{
                clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative h-screen w-full">
                    <img className="w-full h-full object-cover object-center" src={courses} alt="Banner 1" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-primary  bg-opacity-70 text-white p-8">
                        <h2 className="text-8xl w-3/4 text-center font-abril">Explore Exciting News Presenter Courses</h2>
                        <p className="text-lg text-center w-3/4 font-merri text-gray-400 mt-12">Enroll in our summer camp and discover a range of courses designed to equip you with the skills needed to become a news presenter. From voice modulation to on-camera presence, our comprehensive curriculum will help you excel in this exciting field.</p>
                        <button className="px-6 py-3 border-2 text-white text-xl font-bold mt-10">Popular Courses</button>
                    </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-screen w-full">
                    <img className="w-full h-full object-cover object-center" src={instructor} alt="Banner 2" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-primary bg-opacity-70 text-white p-8">
                        <h2 className="text-8xl w-3/4 text-center font-abril">Learn from Expert Instructors</h2>
                        <p className="text-lg text-center w-3/4 font-merri text-gray-400 mt-12">Join our summer camp to receive guidance from seasoned news presenters who have excelled in the industry. Our instructors bring a wealth of experience and will share their knowledge, techniques, and insider tips to help you develop your presenting skills.</p>
                        <button className="px-6 py-3 border-2 text-white text-xl font-bold mt-10">Our Instructors</button>
                    </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative h-screen w-full">
                    <img className="w-full h-full object-cover object-center" src={opportunity} alt="Banner 3" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-primary bg-opacity-70 text-white p-8">
                        <h2 className="text-8xl w-3/4 text-center font-abril">Unlock Exciting Opportunities</h2>
                        <p className="text-lg text-center w-3/4 font-merri text-gray-400 mt-12">At our summer camp, you'll have the chance to showcase your talent and gain practical experience through real-world opportunities. From hosting mock news broadcasts to conducting interviews, you'll develop your skills in a supportive and professional environment.</p>
                        <button className="px-6 py-3 border-2 text-white text-xl font-bold mt-10">New Opportunities</button>
                    </div>
                    </div>
                </SwiperSlide>
                
            </Swiper>
        </div>
    );
};

export default Carousel;
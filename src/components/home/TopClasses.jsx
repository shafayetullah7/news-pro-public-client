import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { People } from "@mui/icons-material";
import { useEffect, useRef } from "react";

const TopClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {data:topClasses} = useQuery({
        queryKey:['instructors'],
        queryFn:async()=>{
            return axiosSecure('http://localhost:5000/top-classes')
            .then(res=>res.data);
        }
    })

    const swiperRef = useRef(null);
      
    useEffect(() => {
        if (swiperRef.current) {
        swiperRef.current.swiper.update(); // Update the swiper instance when the window size changes
        }
    }, []);
      


    console.log('top classes:',topClasses)
    return (
        <div>
            <h1 className="text-center text-5xl md:text-7xl md:tracking-wider text-primary font-bold md:w-2/3 mx-auto">Most Popular Courses</h1>
            <p className='md:w-[90%] text-center mx-auto text-sm text-gray-500 mt-8 tracking-widest mb-16'>Embark on an extraordinary learning journey with our premier classes. Immerse yourself in a world of knowledge and unlock your full potential with our carefully crafted selection of top-notch courses. Designed by industry experts and delivered by exceptional instructors, these classes offer a transformative learning experience. Elevate your skills, expand your horizons, and achieve greatness with our premier classes.</p>
            <div>
            <div className="md:w-2/3 mx-auto shadow-xl rounded-2xl overflow-hidden px-7 pt-7">
                <Swiper
                    ref={swiperRef}
                    spaceBetween={16}
                    slidesPerView={1} // Show 1 element on small devices
                    slidesPerGroup={1} // Grouping slides by 1
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination]}
                    breakpoints={{
                        // Custom breakpoint for medium or larger devices
                        768: {
                          slidesPerView: 1.5, // Show 1.5 elements
                          slidesPerGroup: 1, // Grouping slides by 1.5
                        },
                      }}
                    className="mySwiper"
                >
                    {topClasses && topClasses.map((classInfo,index) => (
                        <SwiperSlide key={index}>
                        <div key={classInfo.classId} className="bg-white shadow-md rounded-lg overflow-hidden max-w-[500px]">
                                <div className="">
                                <img
                                    className="w-full h-[300px] object-cover object-top" src={classInfo.classImage} alt={classInfo.className}
                                />
                                <div className="p-4 flex items-start justify-between">
                                    <h3 className="text-2xl font-semibold mb-2 w-auto">{classInfo.className}</h3>
                                    
                                    <p className="text-gray-600 flex items-center gap-3 w-fit"><People className="mb-[1px]"></People> {classInfo.count}</p>
                                </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            
            </div>
        </div>
    );
};

export default TopClasses;
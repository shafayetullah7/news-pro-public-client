import { useState } from 'react';
import CountUp from 'react-countup';
import { FaBookOpen, FaChalkboardTeacher, FaUser } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import ScrollTrigger from 'react-scroll-trigger';


const Stats = () => {
    const [start,setStart] = useState(false);
    return (
        <div className='text-primary dark:text-gray-300'>
    
            <ScrollTrigger onEnter={()=>setStart(true)} onExit={()=>setStart(false)}>
                {start && <div className="flex justify-around flex-wrap gap-10 font-abril lg:w-2/3 mx-auto">
                    <div className="text-center flex items-center flex-col justify-center gap-5  w-[140px]">
                        <FaUser className='text-4xl'></FaUser>
                        <div>
                            <h2 className="text-5xl font-bold mb-2 font-abril">
                            <CountUp end={5000} duration={2} separator="," />+
                            </h2>
                            <p className=" font-bold">Total Users</p>
                        </div>
                    </div>
                    <div className="text-center flex items-center flex-col justify-center gap-5  w-[140px]">
                        <FaBookOpen className='text-4xl'></FaBookOpen>
                        <div>
                            <h2 className="text-5xl font-bold mb-2">
                            <CountUp end={50} duration={2} separator="," />+
                            </h2>
                            <p className="font-bold">Classes</p>
                        </div>
                    </div>
                    <div className="text-center flex items-center flex-col justify-center gap-5  w-[140px]">
                        <FaChalkboardTeacher className='text-4xl'></FaChalkboardTeacher>
                        <div>
                            <h2 className="text-5xl font-bold mb-2">
                            <CountUp end={200} duration={2} separator="," />+
                            </h2>
                            <p className="font-bold">Instructors</p>
                        </div>
                    </div>
                    <div className="text-center flex items-center flex-col justify-center gap-5  w-[140px]">
                        <MdCategory className='text-4xl'></MdCategory>
                        <div>
                            <h2 className="text-5xl font-bold mb-2">
                            <CountUp end={10} duration={2} separator="," />+
                            </h2>
                            <p className="font-bold">Course Categories</p>
                        </div>
                    </div>
                </div>}
            </ScrollTrigger>
        </div>

    );
};

export default Stats;
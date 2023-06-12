import { Helmet } from "react-helmet-async";
import Banner from "../shared/Banner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const {data:instructors} = useQuery({
        queryKey:['instructors'],
        queryFn:async()=>{
            return axiosSecure('http://localhost:5000/instructors')
            .then(res=>res.data);
        }
    })
    return (
        <div>
            <Helmet>
                <title>NewsPro | Instructors</title>
            </Helmet>
            <Banner image='https://i.postimg.cc/KYZ7hxNj/Untitled.jpg' title='All Instructors'></Banner>
            {instructors && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {instructors.map((instructor) => (
                    <div key={instructor.email} className="bg-white rounded-lg shadow-md p-6">
                    <img src={instructor.photoUrl} alt="Instructor" className="w-32 h-32 rounded-full mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{instructor.name}</h2>
                    <p className="text-gray-600 mb-2">{instructor.email}</p>
                    <p className="text-gray-600 mb-2">{instructor.phoneNumber}</p>
                    <p className="text-gray-600 mb-2">{instructor.gender}</p>
                    <p className="text-gray-600">{instructor.address}</p>
                    <button className="bg-primary hover:scale-110 duration-200 active:scale-90 text-white font-semibold py-2 px-4 rounded mt-4">
                        See Classes
                    </button>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default Instructors;
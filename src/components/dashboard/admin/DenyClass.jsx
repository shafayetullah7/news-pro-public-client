import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxios";
import Swal from "sweetalert2";


const DenyClass = () => {
    // const data = useLoaderData();
    const {id} = useParams();
    const [axiosSecure] = useAxiosSecure();
    // console.log(id);
    const navigate = useNavigate();

    const {data,isLoading} = useQuery({
        queryKey:['class',id],
        queryFn:async()=>{
            return axiosSecure.get(`http://localhost:5000/classes/${id}`).then(res=>{
                return res.data;
            })
        }
    })

    const handleDeny = (e) =>{
        e.preventDefault();
        // const form = e.target;
        const feedback = e.target.feedback.value;
        const update = {status:'denied',feedback};
        console.log(update);

        axiosSecure.put(`http://localhost:5000/classes/${id}/deny`,update)
        .then(()=>{
            // console.log(res);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Class Denied!',
                showConfirmButton: false,
                timer: 1500
              })
              navigate(-1);
        })
        .catch(err=>console.log(err))
    }
    console.log(data);
    return (
        <div>
            {isLoading && <div className="w-fit mx-auto"><span className="loading loading-spinner loading-md"></span></div>}
            {data && <div className="w-full flex flex-col md:flex-row md:px-5 items-center justify-center gap-5">
            <div className="md:max-w-[400px] md:max-h-[400px]">
                <img src={data?.classImage} className="w-full h-full object-cover object-center rounded-md shadow-md" alt="" />
            </div>
            <div>
                <h1 className="text-3xl font-bold">{data?.className}</h1>
                <div className="mt-5">
                    <p><span className="font-bold">Instructor: </span>{data?.instructorName}</p>
                    <p><span className="font-bold">Email: </span>{data?.instructorEmail}</p>
                    <p><span className="font-bold">Available Seats: </span>{data?.availableSeats}</p>
                    <p><span className="font-bold">Price: </span>${data?.price}</p>
                </div>
                <form className="mt-5" onSubmit={handleDeny}>
                    <textarea name="feedback" className="w-full h-[100px] rounded-md border outline-admin p-3 text-sm" placeholder="Write Feedback..."></textarea>
                    <div className="mt-10">
                        <button type="submit" className="px-5 py-2 rounded-md border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-100">Deny Class</button>
                    </div>
                </form>
            </div>
        </div>}
        </div>
    );
};

export default DenyClass;
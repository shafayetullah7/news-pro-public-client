import {Class, ExpandLess, ExpandMore} from "@mui/icons-material";
import { SiGoogleclassroom } from "react-icons/si";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { MdList } from "react-icons/md";
// import { FaRegUserCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

const Dashboard = () => {
    const {data:profile,isLoading} = useProfile();
    // console.log(profile);
    // console.log(profile?.type)

    const [expand,setExpand] = useState(false);
    const handleExpand = ()=>{
        // console.log(expand);
        setExpand(!expand);
    }
    const InstructorMenus = <>
        <Link to={'/dashboard'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
            <p>Profile</p>
        </div>
        </Link>
        <Link to={'/dashboard/addClass'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <Class></Class>
            <p>Add a class</p>
        </div>
        </Link>
        <Link to={'/dashboard/MyClasses'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>
            <p>My Classes</p>
        </div>
        </Link>
    </>

    const adminMenu = <>
        <Link to={'/dashboard'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
            <p>Profile</p>
        </div>
        </Link>
        <Link to={'/dashboard/manageClasses'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <Class className="text-2xl"></Class>
            <p>Manage Classes</p>
        </div>
        </Link>
        <Link to={'/dashboard/manageUsers'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <SiGoogleclassroom className="text-2xl"></SiGoogleclassroom>
            <p>Manage Users</p>
        </div>
        </Link>
    </>

    const studentMenu = <>
        <Link to={'/dashboard'}>
            <div className="flex gap-3 items-center border-b w-[150px]">
                <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
                <p>Profile</p>
            </div>
            </Link>
        <Link to={'/dashboard/wishlist'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <MdList className="text-2xl"></MdList>
            <p>My Wishlist</p>
        </div>
        </Link>
        <Link to={'/dashboard/enrolledClasses'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <SiGoogleclassroom className="text-2xl"></SiGoogleclassroom>
            <p>Enrolled Classes</p>
        </div>
        </Link>
        <Link to={'/dashboard/paymentHistory'}>
        <div className="flex gap-3 items-center border-b w-[150px]">
            <BsCashCoin className="text-2xl"></BsCashCoin>
            <p>Payment History</p>
        </div>
        </Link>
    </>


    return (
        
        <div>
            {!isLoading && <>
                <div>
                <div className={`collapse md:hidden ${profile?.type==='admin'?'bg-admin text-white':profile?.type==='instructor'?'bg-instructor text-black':'bg-student text-black'} rounded-none`}>
                    <input type="checkbox" className="peer" onChange={handleExpand}/> 
                    <div className={`collapse-title text-primary-content flex items-center justify-between ${expand && 'border-b'}`}>
                        {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
                        <div className="flex justify-between items-center gap-5 py-4">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-xs text-gray-400 border border-gray-400 rounded-full px-2">{profile?.type || 'Not defined'}</p>
                        </div>
                        {!expand && <ExpandMore></ExpandMore>}
                        {expand && <ExpandLess></ExpandLess>}
                    </div>
                    <div className="collapse-content text-primary-content mt-5 flex flex-wrap items-center gap-y-3 justify-between"> 
                        {profile?.type==='instructor' && InstructorMenus}
                        {profile?.type==='admin' && adminMenu}
                        {(profile?.type==='student') && studentMenu}
                    </div>
                </div>
            </div>
            <div className=" md:grid md:grid-cols-5">
                <div className={` w-full min-h-screen hidden md:block ${profile?.type==='admin'?'bg-admin text-white':profile?.type==='instructor'?'bg-instructor text-black':'bg-student text-black'} text-white px-5 py-5`}>
                    <div>
                        <div className="flex justify-between items-center py-4 border-b">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                            <p className="text-xs text-gray-400 border border-gray-400 rounded-full px-2">{profile?.type || 'Not defined'}</p>
                        </div>
                        <div className="px-5 mt-5 flex flex-col gap-5 ">
                            {profile?.type==='instructor' && InstructorMenus}
                            {profile?.type==='admin' && adminMenu}
                            {(profile?.type==='student') && studentMenu}
                        </div>
                    </div>
                </div>
                <div className="w-full md:col-span-4 bg-admin bg-opacity-10">
                    <div className="mt-9">
                        <Outlet></Outlet>
                    </div>
                    

                    
                </div>
            </div>
            </>}
        </div>
    );
};

export default Dashboard;
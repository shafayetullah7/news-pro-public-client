import {Class, ExpandLess, ExpandMore} from "@mui/icons-material";
import { SiGoogleclassroom } from "react-icons/si";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useProfile from "../../hooks/useProfile";

const Dashboard = () => {
    const {data:profile} = useProfile();
    console.log(profile);
    console.log(profile?.type)

    const [expand,setExpand] = useState(false);
    const handleExpand = ()=>{
        console.log(expand);
        setExpand(!expand);
    }
    const InstructorMenus = <>
        <Link to={'/dashboard/addClass'}>
        <div className="flex gap-3 items-center border-b w-[120px]">
            <Class></Class>
            <p>Add a class</p>
        </div>
        </Link>
        <Link>
        <div className="flex gap-3 items-center border-b w-[120px]">
            <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>
            <p>My Classes</p>
        </div>
        </Link>
    </>

    const adminMenu = <>
        <Link to={'/dashboard/addClass'}>
        <div className="flex gap-3 items-center border-b w-[120px]">
            <Class></Class>
            <p>Manage Classes</p>
        </div>
        </Link>
        <Link>
        <div className="flex gap-3 items-center border-b w-[120px]">
            <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>
            <p>Manage Users</p>
        </div>
        </Link>
    </>
    return (
        
        <div>
            <div>
                <div className="collapse md:hidden bg-primary text-white rounded-none">
                    <input type="checkbox" className="peer" onChange={handleExpand}/> 
                    <div className={`collapse-title text-primary-content flex items-center justify-between ${expand && 'border-b'}`}>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        {!expand && <ExpandMore></ExpandMore>}
                        {expand && <ExpandLess></ExpandLess>}
                    </div>
                    <div className="collapse-content text-primary-content mt-5 flex justify-between"> 
                        {profile?.type==='instructor' && InstructorMenus}
                    </div>
                </div>
            </div>
            <div className=" md:grid md:grid-cols-5 border border-red-500">
                <div className=" w-full min-h-screen hidden md:block bg-primary  text-white px-5 py-5">
                    <div>
                        <h1 className="text-2xl font-bold py-5 border-b">Dashboard</h1>
                        <div className="px-5 mt-5 flex flex-col gap-5 ">
                            {profile?.type==='instructor' && InstructorMenus}
                        </div>
                    </div>
                </div>
                <div className="w-full border border-blue-600 md:col-span-4">
                    <div className="mt-9">
                        <Outlet></Outlet>
                    </div>
                    

                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
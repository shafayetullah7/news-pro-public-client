import {Class, ExpandLess, ExpandMore} from "@mui/icons-material";
import { SiGoogleclassroom } from "react-icons/si";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
    const [expand,setExpand] = useState(false);
    const handleExpand = ()=>{
        console.log(expand);
        setExpand(!expand);
    }
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
                    <div className="collapse-content text-primary-content mt-5"> 
                        <Link to={'/dashboard/addClass'}>
                        <div className="flex gap-3 items-center mx-5 border-b">
                            <Class></Class>
                            <p>Add a class</p>
                        </div>
                        </Link>
                        <div className="flex gap-3 items-center mt-5 mx-5 border-b">
                            <SiGoogleclassroom className="text-xl"></SiGoogleclassroom>
                            <p>My Classes</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="bg-gray-500 w-[250px] hidden md:block">
                    <p>Add a Class</p>
                    <p>My Classes</p>
                </div>
                <div className="w-full border">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
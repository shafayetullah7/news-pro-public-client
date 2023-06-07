import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatar from '../../../assets/user.jpg';
import { Drawer, Tooltip } from "@mui/material";
import { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

const Nav = () => {
    const {user,loading,logoutUser} = useAuth();
    const [drawerOpen,setdrawerOpen] = useState(false);

    const logout = ()=>{
        logoutUser()
        .then(()=>{
            console.log('logged out')
            setdrawerOpen(false);
        })
    }

    const navItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link>Instructors</Link></li>
        <li><Link>Classes</Link></li>
        
    </>
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-lg font-merri">
                {navItems}
            </ul>
            </div>
            <a className="font-abril normal-case text-3xl md:text-4xl border-b-4 border-primary">News Pro</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-lg font-merri">
            {navItems}
            </ul>
        </div>
        <div className="navbar-end">
            {!loading && <div>
                {!user && <Link to='/login' className="bg-primary text-white px-5 py-3 rounded-md font-bold text-sm hover:bg-white border-2 border-primary hover:text-primary duration-100 cursor-pointer font-merri normal-case tracking-widest">Login</Link>}
            {user && <div className="w-fit h-fit" onClick={()=>setdrawerOpen(true)}>
                <Tooltip title={user.displayName} placement="left-start">
                    <img className="w-14 h-14 rounded-full border-2 object-cover object-center cursor-pointer" src={user?.photoURL || avatar} alt="" />
                </Tooltip>
                </div>}
            </div>}
        </div>
        <Drawer anchor="right" open={drawerOpen} onClose={()=>setdrawerOpen(false)}>
                <div className="p-8">
                    <div className="bg-base-100 text-primary">
                        <div className="flex gap-5 items-center min-w-[250px] bg-primary bg-opacity-10 p-2 rounded-lg cursor-pointer hover:scale-105 duration-100 shadow-lg">
                            <img className="w-12 h-12 rounded-full border-2 border-primary object-cover object-center cursor-pointer" src={user?.photoURL || avatar} alt="" />  
                            <p className="font-bold font-merri">{user?.displayName}</p>
                        </div>
                        <div>
                            <div className="flex mx-2 mt-10 hover:bg-gray-200 rounded-lg p-2 duration-100 cursor-pointer gap-3 items-center font-bold font-merri text-sm">
                                <MdOutlineDashboard className="text-2xl"></MdOutlineDashboard>
                                <p>Dashboard</p>
                            </div>
                            <div className="flex mx-2 hover:bg-gray-200 rounded-lg p-2 duration-100 cursor-pointer gap-3 items-center font-bold font-merri text-sm" onClick={logout}>
                                <AiOutlineLogout className="text-2xl"></AiOutlineLogout>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
        </Drawer>
    </div>
    );
};

export default Nav;
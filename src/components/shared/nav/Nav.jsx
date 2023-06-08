import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatar from '../../../assets/user.jpg';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { MdOutlineDashboard} from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";

const Nav = () => {
    const {user,loading,logoutUser} = useAuth();
    // const [drawerOpen,setdrawerOpen] = useState(false);
    const [theme,setTheme] = useState(localStorage.getItem('theme')?localStorage.getItem('theme'):'light');

    useEffect(()=>{
        localStorage.setItem('theme',theme);
        // const localTheme = localStorage.getItem('theme');
        // document.querySelector('html').setAttribute('data-theme',localTheme);
        if(theme==='dark'){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
        // console.log(theme);
        // console.log(localTheme);
        // console.log(document.documentElement.classList);
    },[theme])

    const handleToggle = (e) =>{
        setTheme(e.target.checked?'dark':'light')
    }

    const logout = ()=>{
        logoutUser()
        .then(()=>{
            console.log('logged out')
            // setdrawerOpen(false);
        })
    }

    const navItems = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link>Instructors</Link></li>
        <li><Link>Classes</Link></li>
        
    </>
    return (
        <div className="navbar bg-base-100 dark:bg-gray-500 fixed top-0 z-10 bg-opacity-80">
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

        <label className="swap swap-rotate pr-3">
        <input type="checkbox" onChange={handleToggle} checked={theme==='dark'?true:false}/>
        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

            {!loading && <div>
                {!user && <Link to='/login' className="bg-primary text-white px-5 py-3 rounded-md font-bold text-sm hover:bg-white border-2 border-primary hover:text-primary duration-100 cursor-pointer font-merri normal-case tracking-widest">Login</Link>}
                
                {user && <div className="dropdown dropdown-end">
                {/* <label tabIndex={0} className="btn m-1">Click</label> */}
                <div className="w-fit h-fit" tabIndex={0}>
                <Tooltip title={user.displayName} placement="left-start">
                    <img className="w-14 h-14 rounded-full border-2 object-cover object-center cursor-pointer" src={user?.photoURL || avatar} alt="" />
                </Tooltip>
                </div>
                <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box z-10 dark:bg-gray-500">
                <div className="p-8">
                    <div className="bg-transparent text-primary ">
                        <div className="flex gap-5 items-center min-w-[250px] bg-primary bg-opacity-10 p-2 rounded-lg cursor-pointer hover:scale-105 duration-100 shadow-lg">
                            <img className="w-12 h-12 rounded-full border-2 border-primary object-cover object-center cursor-pointer" src={user?.photoURL || avatar} alt="" />  
                            <p className="font-bold font-merri">{user?.displayName}</p>
                        </div>
                        <div className="bg-transparent">
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
                </div>
              </div>}
            </div>}
        </div>

    </div>
    );
};

export default Nav;
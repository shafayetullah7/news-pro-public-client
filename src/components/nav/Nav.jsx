import { Link } from "react-router-dom";

const Nav = () => {
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
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navItems}
            </ul>
            </div>
            <a className="font-abril normal-case text-4xl border-b-4 border-primary">News Pro</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-lg font-merri">
            {navItems}
            </ul>
        </div>
        <div className="navbar-end">
            <a className="btn font-merri normal-case tracking-widest">Login</a>
        </div>
        </div>
    );
};

export default Nav;
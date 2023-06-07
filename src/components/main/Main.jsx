import { Outlet } from "react-router-dom";
import Nav from "../shared/nav/Nav";
import { ToastContainer } from "react-toastify";

const Main = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-1 md:px-0 font-merri">
            <Nav></Nav>
            <Outlet></Outlet>

            
        </div>
    );
};

export default Main;
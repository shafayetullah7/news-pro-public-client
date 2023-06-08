import { Outlet } from "react-router-dom";
import Nav from "../shared/nav/Nav";

const Main = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-1 md:px-0 font-merri dark:bg-gray-700">
            <div className="relative">
            <Nav></Nav>
            </div>
            <Outlet></Outlet>

            
        </div>
    );
};

export default Main;
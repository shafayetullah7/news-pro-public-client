import { Outlet } from "react-router-dom";
import Nav from "../shared/nav/Nav";

const Main = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-1">
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;
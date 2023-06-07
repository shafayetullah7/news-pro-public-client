import Lottie from "lottie-react";
import errorImg from '../../assets/errorImg.json'
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="w-3/4 md:w-1/3 mx-auto">
                <Lottie animationData={errorImg} loop={true} />
            </div>
            <p className="text-5xl text-center font-merri text-red-500 font-bold">Page not found</p>
            <Link to={'/'} replace={true}><button className="btn btn-active btn-neutral normal-case mx-auto flex items-center mt-16"><AiOutlineHome className="text-2xl"></AiOutlineHome>Return to home</button></Link>
        </div>
    );
};

export default ErrorPage;
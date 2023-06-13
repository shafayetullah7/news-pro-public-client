import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";
import TopInstructors from "./TopInstructors";
import TopClasses from "./TopClasses";
import Contacts from "./Contacts";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NewsPro | Home</title>
            </Helmet>
            
            <div>
                <Carousel></Carousel>
            </div>
            <div className="my-20">
                <Contacts></Contacts>
            </div>

            <div className="bg-gray-200">
                <div className="pt-32">
                    <TopInstructors></TopInstructors>
                </div>

                <div className="mt-52 pb-44">
                    <TopClasses></TopClasses>
                </div>
            </div>
            <div className="h-screen"></div>
        </div>
    );
};

export default Home;
import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";
import TopInstructors from "./TopInstructors";
import TopClasses from "./TopClasses";
import Contacts from "./Contacts";
import { Fade } from "react-awesome-reveal";
import Testimonials from "./Testimonials";
import Stats from "./Stats";
import Footer from "../shared/Footer";



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

            <div className="bg-gray-200 dark:bg-gray-600">
                <div className="pt-32">
                    <TopInstructors></TopInstructors>
                </div>

                <div className="mt-52 pb-44">
                    <Fade delay={200} duration={2000}>
                        <TopClasses></TopClasses>
                    </Fade>
                </div>
            </div>
            <div className="my-52">
                <Fade>
                    <Stats></Stats>
                </Fade>
            </div>
            <div>
                <Testimonials></Testimonials>
            </div>
            
        </div>
    );
};

export default Home;
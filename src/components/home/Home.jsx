import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";
import TopInstructors from "./TopInstructors";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NewsPro | Home</title>
            </Helmet>
            
            <div>
                <Carousel></Carousel>
            </div>

            <div className="mt-64">
                <TopInstructors></TopInstructors>
            </div>
            <div className="h-screen"></div>
        </div>
    );
};

export default Home;
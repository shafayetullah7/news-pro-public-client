import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NewsPro | Home</title>
            </Helmet>
            
            <div>
                <Carousel></Carousel>
            </div>
        </div>
    );
};

export default Home;
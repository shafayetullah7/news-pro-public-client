import { Helmet } from "react-helmet";
import Nav from "../../shared/nav/Nav";
import Carousel from "./Carousel";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NewsPro | Home</title>
            </Helmet>
            <Nav></Nav>
            <div>
                <Carousel></Carousel>
            </div>
        </div>
    );
};

export default Home;
import { Helmet } from "react-helmet";
import Nav from "../nav/Nav";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>NewsPro | Home</title>
            </Helmet>
            <Nav></Nav>
            <h1 className="font-abril">this is home</h1>
        </div>
    );
};

export default Home;
import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import ErrorPage from "../errorPage/ErrorPage";
import Home from "../home/Home";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
        ]
    }
]);

// export routes;
export default routes
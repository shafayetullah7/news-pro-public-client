import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import ErrorPage from "../errorPage/ErrorPage";
import Home from "../home/Home";
import Login from "../access/Login";
import Register from "../access/Register";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            }
        ]
    }
]);

// export routes;
export default routes
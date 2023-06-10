import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import ErrorPage from "../errorPage/ErrorPage";
import Home from "../home/Home";
import Login from "../access/Login";
import Register from "../access/Register";
import Dashboard from "../dashboard/Dashboard";
import AddClass from "../dashboard/instructor/AddClass";
import PrivateRoute from "../access/PrivateRoute";
import InstructorOnly from "../access/InstructorOnly";
import AdminOnly from "../access/AdminOnly";
import ManageUsers from "../dashboard/admin/ManageUsers";
import ManageClasses from "../dashboard/admin/ManageClasses";
import DenyClass from "../dashboard/admin/DenyClass";
// import axios from "axios";


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
            },
            {
                path:'dashboard',
                element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children:[
                    {
                        path:'addClass',
                        element:<PrivateRoute><InstructorOnly><AddClass></AddClass></InstructorOnly></PrivateRoute>
                    },
                    {
                        path:'manageUsers',
                        element:<PrivateRoute><AdminOnly><ManageUsers></ManageUsers></AdminOnly></PrivateRoute>
                    },
                    {
                        path:'manageClasses',
                        element:<PrivateRoute><AdminOnly><ManageClasses></ManageClasses></AdminOnly></PrivateRoute>
                    },
                    {
                        path:'denyClass/:id',
                        element:<DenyClass></DenyClass>,
                    }
                ]
            }
        ]
    }
]);

// export routes;
export default routes
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
import Classes from "../classes/Classes";
import Wishlist from "../dashboard/student/Wishlist";
import StudentOnly from "../access/StudentOnly";
import Payment from "../payment/Payment";
import EnrolledClasses from "../dashboard/student/EnrolledClasses";
import Profile from "../dashboard/Profile";
import PaymentHistory from "../dashboard/student/PaymentHistory";
import Instructors from "../instructors/Instructors";
// import InstructorClasses from "../instructors/InstructorClasses";
// import useAxiosSecure from "../../hooks/useAxios";
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
                path:'/classes',
                element:<Classes></Classes>
            },
            {
                path:'/instructors',
                element:<Instructors></Instructors>
            },
            {
                path:'dashboard',
                element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children:[
                    {
                        path:'',
                        element:<Profile></Profile>
                    },
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
                    },
                    {
                        path:'wishlist',
                        element:<PrivateRoute><StudentOnly><Wishlist></Wishlist></StudentOnly></PrivateRoute>
                    },
                    {
                        path:'payment/:id',
                        element:<PrivateRoute><StudentOnly><Payment></Payment></StudentOnly></PrivateRoute>,
                    },
                    {
                        path:'enrolledClasses',
                        element:<PrivateRoute><StudentOnly><EnrolledClasses></EnrolledClasses></StudentOnly></PrivateRoute>
                    },
                    {
                        path:'paymentHistory',
                        element:<PrivateRoute><StudentOnly><PaymentHistory></PaymentHistory></StudentOnly></PrivateRoute>
                    },
                    
                ]
            }
        ]
    }
]);

// export routes;
export default routes
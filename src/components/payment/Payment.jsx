import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxios";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const {id} = useParams();
    const [axiosSecure] = useAxiosSecure();
    const [price,setPrice] = useState(null);
    // const [enrollment,setEnrollment] = useState();

    console.log(id);
    // console.log(import.meta.env.VITE_STRIPE_KEY)
    useEffect(()=>{
        console.log('inside useeffect');
        axiosSecure.get(`http://localhost:5000/enrollments/${id}`)
        .then(result=>{
            console.log(result.data);
            console.log('result price',result.data.price);
            setPrice(parseFloat(result.data.price.toFixed(2)));
            // setEnrollment(result.data);
            
        })
        .catch(err=>{
            console.log(err);
        })
    },[id,axiosSecure])

    console.log('price',price);

    return (
        <div>
            <Helmet>
                <title>NewsPro | Payment</title>
            </Helmet>
            <div className="flex justify-between items-center border-b border-b-student px-5">
                <p className="text-3xl font-bold pb-2 text-student">Make Payment</p>
            </div>
            {price && <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm enrollmentId={id} price={price}/>
                </Elements>
            </div>}
            
        </div>
    );
};

export default Payment;
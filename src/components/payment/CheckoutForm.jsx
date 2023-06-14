import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({price,enrollmentId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError,setCardError] = useState('');
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret,setClientSecret] = useState('');
  const {user} = useAuth();
  const [processing,setProcessing] = useState(false);
  const [transactionId,setTransactionId] = useState('');
  const navigate = useNavigate();
  

  console.log('checkout:',price);

  useEffect(()=>{
    axiosSecure.post('https://newspro-server.vercel.app/create-payment-intent',{price})
    .then(res=>{
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    })
  },[price,axiosSecure])

  const handleSubmit = async(event) =>{
    event.preventDefault();
    setProcessing(true);

    setCardError('')
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // console.log(card);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if(error){
      console.log('error : ',error);
      setCardError(error.message);
      return;
    }
    else{
      console.log('payment method : ',paymentMethod);
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'anonymous'
          },
        },
      },
    );

    if(confirmError){
      console.log(confirmError);
      setProcessing(false);
    }
    if(paymentIntent.status==='succeeded'){
      console.log('payment intent',paymentIntent);
      setTransactionId(paymentIntent.id);
      setProcessing(false);
      console.log(paymentIntent.id);

      const updatedData = {
        enrollStatus:'enrolled',
        transactionId:paymentIntent.id,
        paymentDate:new Date().toISOString()
      }
      axiosSecure.put(`https://newspro-server.vercel.app/enrollments/${enrollmentId}`, updatedData)
      .then(response => {
        console.log(response.data.message); // Enrollment updated successfully
        // Handle any further actions or UI updates
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Payment Successfull',
          showConfirmButton: false,
          timer: 1500
        })
        navigate(-1,{replace:true})
      })
      .catch(error => {
        console.error('Error updating enrollment:', error);
        // Handle error and display appropriate message to the user
      });

    }

  }
  return (
    <form onSubmit={handleSubmit} className="w-full md:w-2/3 bg-gray-100 p-10 rounded-xl mx-auto mt-16">
      
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      
      <button type="submit" className={`px-5 py-2 rounded-md bg-green-500 text-white font-bold w-fit block mt-5 ${(!stripe || !clientSecret || processing)?'bg-opacity-50 cursor-wait':'hover:scale-110 duration-100 active:scale-90 cursor-pointer'}`} disabled={!stripe || !clientSecret || processing}>
        Pay
      </button>
      {cardError && <p className="text-xs text-red-600 mt-2">{cardError}</p>}
      {processing && <p className="text-xs text-gray-600 mt-2">Processing Transaction...</p>}
      {transactionId && <p className="text-xs text-green-600">Transaction succeeded with id:{transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
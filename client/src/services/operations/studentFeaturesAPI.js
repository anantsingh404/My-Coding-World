import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScripts(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function buyCourse(
    token,
    courses,
    userDetails,
    navigate,
    dispatch
) {
    // const toastId = toast.loading("Loading...");
    // try {
    //     const orderResponse = await apiConnector(
    //         "POST",
    //         COURSE_PAYMENT_API,
    //         { courses },
    //         {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     );
    //     if (!orderResponse.data.success) {
    //         throw new Error(orderResponse.data.message);
    //     }
    //     toast.success("Payment successful, course purchased!");
    //     resetCart();
    // } catch (err) {
    const toastId = toast.loading("Loading...");
    try {
        //load script
        const res = await loadScripts(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }
        //initiate the order
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            {
                Authorization: `Bearer ${token}`,
            }
        );
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        //Create options
        console.log(orderResponse);
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "EduNxt",
            description: "Thank you for purchasing the Course(s)",
            image: rzpLogo,
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email,
            },
            handler: function (res) {
                //verify payment
                verifyPayment({ ...res, courses }, token, navigate, dispatch);

                //Send successful payment data
                sendPaymentSuccessEmail(
                    res,
                    orderResponse.data.data.amount,
                    token
                );
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! payment failed");
            //console.log(response.error);
        });
    } catch (err) {
        toast.error("Couldn't make payment");
        console.log("Payment error: ", err);
        toast.error("Couldn't make payment");
    }
    toast.dismiss(toastId);
}

const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
    } catch (err) {
        //console.log("Payment success email error: ", err);
    }
};

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        );
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("Payment successful, course purchased!");
        navigate("/dashboard/enrolled-courses");
        bodyData.courses.length > 1 && dispatch(resetCart());
    } catch (err) {
        //console.log("Error in verifying payment: ", err);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
};

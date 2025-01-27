import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getPasswordResetToken } from "../services/operations/authAPI";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        dispatch(getPasswordResetToken(email ,setEmailSent))
    }

    return (
        <div className=" h-screen flex justify-center items-center font-inter">
            {loading ? (
                <LoadingSpinner/>
            ) : (
                <div className=" text-richblack-5 h-full w-[25%] flex justify-center items-start flex-col gap-7">
                    <h1 className=" text-3xl font-semibold">
                        {!emailSent
                            ? "Reset Your Password"
                            : "Check Your Email"}
                    </h1>
                    <p className="">
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We've sent the reset link to ${email}`}
                    </p>
                    <form className="w-full" onSubmit={handleOnSubmit}>
                        {!emailSent && (
                            <label className="w-full">
                                <div className="flex items-center gap-1">
                                    <p className="md:text-[12px] lg:text-[16px] mb-1">
                                        Email Address
                                    </p>
                                    <sup className=" text-pink-200">*</sup>
                                </div>
                                <input
                                    required
                                    className=" bg-richblack-800 p-3 rounded-md outline-none w-full shadow-[0px_1px_0px_0px_rgba(255,255,255,0.28)] mb-6"
                                    placeholder="Enter Email ID"
                                    type="email"
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </label>
                        )}
                        <button
                            type="submit"
                            className="text-center px-[24px] w-full py-[12px] rounded-[8px] font-semibold max-w-maxContent  bg-yellow-50 text-black hover:scale-95 transition-all duration-200 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)]"
                        >
                            {!emailSent ? "Submit" : "Resend Email"}
                        </button>
                    </form>

                    <div className="flex flex-row items-center justify-center gap-2">
                        <AiOutlineArrowLeft />
                        <Link to={"/login"}>Back to login</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;

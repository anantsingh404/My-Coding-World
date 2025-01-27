import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { AiOutlineArrowLeft } from "react-icons/ai";
import LoadingSpinner from "../components/common/LoadingSpinner";

const VerifyEmail = () => {
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(
            signUp(
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
                navigate
            )
        );
    };

    return (
        <div className="text-richblack-5 flex items-center justify-center w-full h-[80vh]">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="w-[23%] flex flex-col gap-2 justify-center items-start">
                    <h1 className=" text-3xl">Verify Email</h1>
                    <p className=" my-2 text-richblack-100">
                        A verification code has been sent to your email. Enter
                        that code below:
                    </p>
                    <form
                        onSubmit={submitHandler}
                        className="w-full flex flex-col justify-center items-center mt-5 text-richblack-5"
                    >
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    placeholder="-"
                                    style={{
                                        boxShadow:
                                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />

                        <button
                            type="submit"
                            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="flex flex-row justify-between w-full mt-5">
                        <div className="flex flex-row justify-center items-center gap-2">
                            <AiOutlineArrowLeft />
                            <Link to="/login">Back to Login</Link>
                        </div>
                        <div
                            className=" text-blue-100"
                            onClick={() =>
                                dispatch(sendOtp(signupData.email, navigate))
                            }
                        >
                            Resend it
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;

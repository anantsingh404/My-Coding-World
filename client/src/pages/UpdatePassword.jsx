import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
    const location = useLocation()
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const {password, confirmPassword} = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = location.pathname.split('/').at(-1);

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            dispatch(resetPassword(password, confirmPassword, token, navigate));
        }
    };

    return (
        <div className="flex flex-col w-full h-[70vh] justify-center items-center">
            {loading ? (
                <div></div>
            ) : (
                <div className=" text-richblack-5 flex flex-col gap-2">
                    <h1 className=" text-3xl font-semibold">Choose a New Password</h1>
                    <p>
                        Almost done. Enter your new password and you're all set.
                    </p>
                    <form onSubmit={submitHandler} className="flex flex-col gap-7 mt-5">
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Create Password{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter Password"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>
                        </label>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm Password{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                            />
                            <span
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>
                        </label>
                        <button
                            type="submit"
                            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 "
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;

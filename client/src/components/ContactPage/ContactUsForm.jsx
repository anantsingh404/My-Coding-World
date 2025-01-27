import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CountryCode from "../../data/countrycode.json";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import { toast } from "react-hot-toast";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        const toastId = toast.loading("Submitting form...");
        try {
            setLoading(true);
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            );
            // console.log("form response: ", res)
            toast.success("Submitted successfully!");
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
        setLoading(false);
        toast.dismiss(toastId);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNumber: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%] relative">
                    <label htmlFor="firstName" className="lable-style">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        className="form-style"
                        {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                        <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastName" className="lable-style">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last name"
                        className="form-style"
                        {...register("lastName")}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2 relative">
                <label htmlFor="email" className="lable-style">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    className="form-style"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2 relative">
                <label htmlFor="phoneNumber" className="lable-style">
                    Phone Number
                </label>

                <div className="flex gap-5">
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name"
                            className="form-style"
                            {...register("countrycode", { required: true })}
                        >
                            {CountryCode.map((ele, i) => {
                                return (
                                    <option key={i} value={ele.code}>
                                        {ele.code} -{ele.country}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="12345 67890"
                            className="form-style"
                            {...register("phoneNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Invalid Phone Number",
                                },
                                minLength: {
                                    value: 10,
                                    message: "Invalid Phone Number",
                                },
                            })}
                        />
                    </div>
                </div>
                {errors.phoneNumber && (
                    <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                        {errors.phoneNumber.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2 relative">
                <label htmlFor="message" className="lable-style">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="form-style"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                )}
            </div>

            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
             !loading &&
             "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                {loading ? "sending..." : "send message"}
            </button>
        </form>
    );
};

export default ContactUsForm;

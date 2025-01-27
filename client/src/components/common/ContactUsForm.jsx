import React, { useState, useEffect } from "react";
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
        //console.log("Data:", data);
        try {
            setLoading(true);
            const response = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            );
            // const response = { status: "OK" };
            //console.log("Logging response: ", response);
            toast.success("Submitted Successfully!");
        } catch (err) {
            //console.log("Error:", err);
            toast.error("Error in submitting form");
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
    }, [isSubmitSuccessful, reset]);

    return (
        <form
            onSubmit={handleSubmit(submitContactForm)}
            className="text-[#d0342c] w-[80%]"
        >
            <div className="flex flex-col gap-7">
                {/* Name */}
                <div className="flex w-full justify-between relative">
                    {/* First Name */}
                    <div className="flex w-[48%] flex-col gap-2">
                        <label
                            htmlFor="firstName"
                            className="text-richblack-5 text-sm "
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name"
                            {...register("firstName", { required: true })}
                            className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]"
                        />
                        {errors.firstName && (
                            <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                                Please enter your first name
                            </span>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="w-[48%] flex flex-col gap-2">
                        <label
                            htmlFor="lastName"
                            className="text-richblack-5 text-sm"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter last name"
                            {...register("lastName")}
                            className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]"
                        />
                        {/* Error commented as last name is not required */}
                        {/* {
                              errors.lastName && (
                                <span>Please enter your last name</span>
                              )
                            } */}
                    </div>
                </div>

                {/* Email ID */}
                <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="text-richblack-5 text-sm">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        {...register("email", { required: true })}
                        className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]"
                    />
                    {/* Error commented as last name is not required */}
                    {errors.email && (
                        <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                            Please enter your email address
                        </span>
                    )}
                </div>

                {/* Phone No. */}
                <div className="flex flex-col gap-2 relative">
                    <label
                        htmlFor="phoneNumber"
                        className="text-richblack-5 text-sm "
                    >
                        Phone Number
                    </label>
                    <div className="flex justify-between">
                        <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycode", { required: true })}
                            className="w-[15%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]"
                            value="+91"
                        >
                            {CountryCode.map((element, i) => (
                                <option value={element.code} key={i}>
                                    {element.code}-{element.country}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="12345 67890"
                            {...register("phoneNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter a Phone no.",
                                },
                                maxLength: {
                                    value: 12,
                                    message:
                                        "Pelase enter a valid phone number.",
                                },
                                minLength: {
                                    value: 10,
                                    message:
                                        "Pelase enter a valid phone number.",
                                },
                            })}
                            className="w-[82%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)]"
                        />
                    </div>
                    {errors.phoneNumber && (
                        <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                            {errors.phoneNumber.message}
                        </span>
                    )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 relative">
                    <label
                        htmlFor="message"
                        className="text-richblack-5 text-sm "
                    >
                        Message
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        placeholder="Enter your message"
                        {...register("message", { required: true })}
                        className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 shadow-[inset_0px_-1px_0px_rgba(255,255,255,0.18)] resize-none"
                    ></textarea>
                    {errors.message && (
                        <span className="absolute -bottom-5 text-[12px] text-yellow-100">
                            Please Enter a message
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    disabled={loading}
                    type="submit"
                    className="text-center px-[24px] py-[12px] rounded-[8px] font-medium bg-yellow-50 text-richblack-900 hover:scale-95 transition-all duration-200 hover:shadow-noneshadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] cursor-pointer"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default ContactUsForm;

import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

const UpdateProfileInfo = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //console.log(user.additionalDetails.dateOfBirth);

    const date = new Date();
    const todaysDate = `${date.getFullYear().toString()}-0${date
        .getMonth()
        .toString()}-${date.getDate().toString()}`;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateProfile(token, data));
        } catch (e) {
            console.log("error: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitProfileForm)} className="w-[80%]">
            <div className="flex flex-col gap-4 w-full bg-richblack-800 p-6 border-richblack-700 border rounded-lg">
                <h2 className="text-lg font-semibold text-richblack-5 ">
                    Profile Information
                </h2>
                {/* Name Section */}
                <div className="flex lg:flex-row flex-col gap-2 justify-between w-full">
                    <div className="w-[48%] flex flex-col gap-1">
                        <label
                            htmlFor="firstName"
                            className="text-richblack-5 text-sm"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName}
                        />
                        {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your first name.
                            </span>
                        )}
                    </div>
                    <div className="w-[48%] flex flex-col gap-1">
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
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("lastName", { required: true })}
                            defaultValue={user?.lastName}
                        />
                        {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                            </span>
                        )}
                    </div>
                </div>
                {/* DOB and gender */}
                <div className="flex lg:flex-row justify-between">
                    <div className="w-[48%] flex flex-col gap-1">
                        <label
                            htmlFor="dateOfBirth"
                            className="text-richblack-5 text-sm"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            max={todaysDate}
                            placeholder={todaysDate}
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date of Birth",
                                },
                                max: {
                                    value: new Date()
                                        .toISOString()
                                        .split("T")[0],
                                    message:
                                        "Date of Birth cannot be in the future.",
                                },
                            })}
                            //Check for DOB after save
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                    <div className="w-[48%] flex flex-col gap-1">
                        <label
                            htmlFor="gender"
                            className=" text-richblack-5 text-sm"
                        >
                            Gender
                        </label>
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline focus:ring-0 focus:outline-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[14px] border-r-[16px] border-transparent text-richblack-5"
                            {...register("gender", {
                                required: {
                                    value: true,
                                    message: "Please select a gender",
                                },
                            })}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to say">
                                Prefer not to say
                            </option>
                        </select>
                        {errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.gender.message}
                            </span>
                        )}
                    </div>
                </div>
                {/* Contact No. and About */}
                <div className="flex lg:flex-row flex-col gap-2 justify-between w-full">
                    <div className="w-[48%] flex flex-col gap-1">
                        <label
                            htmlFor="contactNumber"
                            className="text-richblack-5 text-sm"
                        >
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Enter contact number"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("contactNumber", { required: true })}
                            defaultValue={user?.additionalDetails.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your contact number.
                            </span>
                        )}
                    </div>
                    <div className="w-[48%] flex flex-col gap-1">
                        <label
                            htmlFor="about"
                            className="text-richblack-5 text-sm"
                        >
                            About
                        </label>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder="Enter about yourself"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("about", { required: true })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter about yourself.
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-5 justify-end">
                <IconBtn
                    customClasses={
                        "cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    }
                    onclick={() => {
                        navigate("/dashboard/my-profile");
                    }}
                    text={"Cancel"}
                />
                <IconBtn
                    customClasses={
                        "bg-yellow-50 text-richblack-900 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-2 border border-yellow-5"
                    }
                    type="submit"
                    text={"Save"}
                />
            </div>
        </form>
    );
};

export default UpdateProfileInfo;

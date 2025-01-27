import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FiEdit } from "react-icons/fi";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    return (
        <div className="text-richblack-5 w-full h-full flex items-center justify-center flex-col gap-5">
            <h1 className="text-3xl text-richblack-5 flex justify-start w-[80%] mb-5 font-medium">
                My Profile
            </h1>
            {/* Section 1 */}
            <div className="flex flex-row justify-between w-[80%] items-center bg-richblack-800 p-6 border-richblack-700 border rounded-lg">
                <div className="flex items-center gap-4">
                    <img
                        src={`${user?.image}`}
                        alt={`profile-${user?.firstName}`}
                        className=" aspect-square w-[78px] rounded-full object-cover"
                    />
                    <div>
                        <p className=" font-semibold text-lg">
                            {user?.firstName + " " + user?.lastName}{" "}
                        </p>
                        <p className="text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <div className="max-h-max">
                    <IconBtn
                        children={<FiEdit />}
                        text="Edit"
                        customClasses={
                            "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                        }
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}
                    ></IconBtn>
                </div>
            </div>

            {/* Section 2 */}
            <div className="flex flex-col justify-between w-[80%] items-center bg-richblack-800 p-6 border-richblack-700 border rounded-lg gap-7">
                <div className="flex justify-between w-full items-center">
                    <p className=" text-lg font-semibold">About</p>
                    <IconBtn
                        children={<FiEdit />}
                        text="Edit"
                        customClasses={
                            "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                        }
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}
                    ></IconBtn>
                </div>
                <div className="flex justify-start w-full text-sm text-richblack-5">
                    {user?.additionalDetails?.about ?? (
                        <p className="text-richblack-300">
                            Write something about yourself
                        </p>
                    )}
                </div>
            </div>

            {/* Section 3 */}
            <div className="flex flex-col justify-between w-[80%] items-center bg-richblack-800 p-6 border-richblack-700 border rounded-lg gap-5">
                <div className="flex justify-between w-full items-center">
                    <p className=" text-lg font-semibold">Personal Details</p>
                    <IconBtn
                        children={<FiEdit />}
                        text="Edit"
                        customClasses={
                            "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                        }
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}
                    ></IconBtn>
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-[50%]">
                        <p className=" text-sm text-richblack-600">
                            First Name
                        </p>
                        <p className="text-sm text-richblack-5 font-medium">
                            {user?.firstName}
                        </p>
                    </div>
                    <div className="w-[50%]">
                        <p className=" text-sm text-richblack-600">Last Name</p>
                        <p className="text-sm text-richblack-5 font-medium">
                            {user?.lastName}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-[50%]">
                        <p className=" text-sm text-richblack-600">Email</p>
                        <p className="text-sm text-richblack-300">
                            {user?.email}
                        </p>
                    </div>
                    <div className="w-[50%]">
                        <p className=" text-sm text-richblack-600">Phone no.</p>
                        <div className="text-sm text-richblack-5">
                            {user?.additionalDetails?.contactNumber ?? (
                                <p className="text-richblack-300">
                                    Add Contact no.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-[50%]">
                        <p className=" text-sm text-richblack-600">Gender</p>
                        <div className="text-sm">
                            {user?.additionalDetails?.gender ?? (
                                <p className="text-richblack-300">Add gender</p>
                            )}
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <p className=" text-sm text-richblack-600">
                            Date of Birth
                        </p>
                        <div className="text-sm text-richblack-5">
                            {user?.additionalDetails?.dateOfBirth ?? (
                                <p className="text-richblack-300">
                                    Add Date of Birth
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/settingsAPI";
import {useForm} from "react-hook-form"
import IconBtn from "../../../common/IconBtn";

const UpdatePassword = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitPasswordForm = async (data) => {
        try {
            dispatch(changePassword(token, data));
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitPasswordForm)} className="w-[80%]">
            <div className="flex flex-col gap-8 w-full bg-richblack-800 p-6 border-richblack-700 border rounded-lg">
                <h2 className="text-lg font-semibold text-richblack-5 ">
                    Password
                </h2>
                {/* Current password and New password */}
                <div className="flex lg:flex-row flex-col gap-2 justify-between w-full">
                    <div className="w-[48%] flex flex-col gap-2">
                        <label
                            htmlFor="currentPassword"
                            className="text-richblack-5 text-sm"
                        >
                            Current Password
                        </label>
                        <input
                            type="text"
                            name="currentPassword"
                            id="currentPassword"
                            placeholder="Enter Current Password"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("currentPassword", { required: true })}
                            defaultValue={user?.currentPassword}
                        />
                        {errors.currentPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Current Password.
                            </span>
                        )}
                    </div>
                    <div className="w-[48%] flex flex-col gap-2">
                        <label
                            htmlFor="newPassword"
                            className="text-richblack-5 text-sm"
                        >
                            New Password
                        </label>
                        <input
                            type="text"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full focus:outline-none focus:ring-0 focus:border focus:border-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                            {...register("newPassword", { required: true })}
                            defaultValue={user?.newPassword}
                        />
                        {errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter a new Password.
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
                    text={"Update"}
                />
            </div>
        </form>
    );
};

export default UpdatePassword;

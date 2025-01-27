import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useState } from "react";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        dispatch(setStep(2));
    };

    const goToCourse = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    };

    const OnSubmit = async () => {
        //console.log("value: ", getValues("public"));
        if (
            (course?.status === COURSE_STATUS.PUBLISHED &&
                getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT &&
                getValues("public") === false)
        ) {
            //No changes made hence do nothing, just go to courses page
            goToCourse();
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public")
            ? COURSE_STATUS.PUBLISHED
            : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if (result) {
            goToCourse();
        }
        setLoading(false);
    };
    return (
        <div>
                <form
                    onSubmit={handleSubmit(OnSubmit)}
                    className="flex flex-col gap-2"
                >
                    <div className="flex flex-col gap-6 rounded-md border bg-richblack-800 p-6 border-richblack-700 text-white">
                        <p className="text-2xl text-richblack-5 font-semibold">
                            Publish Settings
                        </p>
                        <div className="flex">
                            <label
                                className="relative flex cursor-pointer items-center rounded-full p-3"
                                htmlFor="public"
                            >
                                <input
                                    id="public"
                                    type="checkbox"
                                    defaultChecked={course?.status? (course?.status===COURSE_STATUS.DRAFT? false : true):true}
                                    className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border border-richblack-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-yellow-50 checked:bg-yellow-50 checked:before:bg-yellow-50 hover:before:opacity-10"
                                    {...register("public", { required: false })}
                                />
                                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-richblack-900 opacity-0 transition-opacity peer-checked:opacity-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </label>
                            <label
                                className="mt-px cursor-pointer select-none font-light text-gray-700"
                                htmlFor="public"
                            >
                                <div className="flex justify-end flex-col pt-2">
                                    <p className=" text-richblack-400 font-medium">
                                        Make this course public.
                                    </p>
                                    <p className=" text-yellow-50 text-xs font-light">
                                        Keep it unchecked if you want to save it
                                        as draft.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="flex mt-10 justify-between gap-4">
                        <button
                            className="bg-richblack-800 text-richblack-5 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                            onClick={goBack}
                            disabled={loading}
                            type="button"
                        >
                            <MdOutlineArrowBackIosNew />
                            Back
                        </button>
                        <IconBtn
                            customClasses={
                                "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-4 py-2 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                            }
                            type="submit"
                            // onclick={OnSubmit}
                            children={
                                <IoCheckmarkDoneSharp className=" text-lg" />
                            }
                            disabled={loading}
                            text={"Save changes"}
                        />
                    </div>
                </form>
        </div>
    );
};

export default PublishCourse;

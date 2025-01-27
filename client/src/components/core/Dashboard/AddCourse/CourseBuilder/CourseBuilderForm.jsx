import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { RiAddCircleLine } from "react-icons/ri";
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import {
    setStep,
    setCourse,
    setEditCourse,
} from "../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
    createSection,
    updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [editSectionName, setEditSectionName] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { editCourse, course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const OnSubmit = async (data) => {
        setLoading(true);
        let result;
        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                token
            );
        } else {
            result = await createSection(
                { sectionName: data.sectionName, courseId: course?._id },
                token
            );
        }
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }
        setLoading(false);
    };
    const goBack = () => {
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    };

    const goToNext = () => {
        //console.log(course);
        if (course.courseContent.length === 0) {
            toast.error("Please create atleast one section");
            return;
        }
        if (
            course.courseContent.some(
                (section) => section.subSections.length === 0
            )
        ) {
            toast.error(
                "Please create atleast one sub-section in each section"
            );
            return;
        }
        dispatch(setStep(3));
    };

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    };

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setValue("sectionName", sectionName);
        setEditSectionName(sectionId);
    };

    return (
        <div className="flex justify-start flex-col w-[80%]">
            <h2 className=" text-2xl font-semibold">Course Builder</h2>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <div className="w-full flex flex-col">
                    <label htmlFor="sectionName" className="text-sm mt-6">
                        Section Name<sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        style={{
                            boxShadow:
                                "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                        type="text"
                        id="sectionName"
                        placeholder="Add section name"
                        {...register("sectionName", { required: true })}
                    />
                    {errors.sectionName && (
                        <span>Section name is required.</span>
                    )}
                </div>
                <div className="flex items-end mt-10 gap-4">
                    <IconBtn
                        type="submit"
                        text={
                            editSectionName
                                ? "Save Section Name"
                                : "Create Section"
                        }
                        outline={true}
                        children={<RiAddCircleLine className="text-xl" />}
                        customClasses={
                            "bg-richblack-800 text-yellow-50 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2 outline outline-1 outline-yellow-50"
                        }
                    />
                    {editSectionName && (
                        <button
                            type="button"
                            className="text-sm text-richblack-300 underline"
                            onClick={cancelEdit}
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            {course?.courseContent?.length > 0 && (
                <NestedView
                    handleChangeEditSectionName={handleChangeEditSectionName}
                />
            )}
            <div className="flex mt-10 justify-end gap-4">
            <button
                    className="bg-richblack-800 text-richblack-5 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                    onClick={goBack}
                >
                    <MdOutlineArrowBackIos />
                    Back
                </button>
                <IconBtn
                    customClasses={
                        "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-4 py-2 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                    }
                    children={<MdOutlineArrowForwardIos />}
                    onclick={goToNext}
                    text={"Next"}
                />
            </div>
        </div>
    );
};

export default CourseBuilderForm;

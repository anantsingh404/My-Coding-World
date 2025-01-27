import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    addCourseDetails,
    editCourseDetails,
    fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import Upload from "./Upload";
import RequirementField from "./RequirementField";
import ChipInput from "../CourseInformation/ChipInput";
import {
    setStep,
    setCourse,
    setEditCourse,
} from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        };
        if (editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseImage", course.thumbnail);
            setValue("courseRequirements", course.instructions);
        }

        getCategories();
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !==
                course.instructions.toString()
        ) {
            return true;
        } else {
            return false;
        }
    };

    const onSubmit = async (data) => {
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
                formData.append(
                    "courseName",
                    currentValues.courseTitle !== course.courseName
                        ? currentValues.courseTitle
                        : course.courseName
                );
                formData.append(
                    "courseDescription",
                    currentValues.courseShortDesc !== course.courseDescription
                        ? currentValues.courseShortDesc
                        : course.courseDescription
                );
                formData.append(
                    "price",
                    currentValues.coursePrice !== course.price
                        ? currentValues.coursePrice
                        : course.price
                );
                formData.append(
                    "whatYouWillLearn",
                    currentValues.courseBenefits !== course.whatYouWillLearn
                        ? currentValues.courseBenefits
                        : course.whatYouWillLearn
                );
                formData.append(
                    "category",
                    currentValues.courseCategory !== course.category
                        ? currentValues.courseCategory._id
                        : course.category
                );
                formData.append(
                    "instructions",
                    currentValues.courseRequirements.toString() !==
                        course.instructions.toString()
                        ? JSON.stringify(currentValues.courseRequirements)
                        : JSON.stringify(course.instructions)
                );
                formData.append(
                    "tag",
                    currentValues.courseTags.toString() !==
                        course.tag.toString()
                        ? JSON.stringify(currentValues.courseTags)
                        : JSON.stringify(course.tag)
                );
                formData.append(
                    "thumbnailImage",
                    currentValues.courseImage !== course.thumbnailImage
                        ? currentValues.courseImage
                        : course.thumbnail
                );
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made");
                dispatch(setStep(2));
            }
            dispatch(setEditCourse(false));
            return;
        }

        //If new Course is created

        // console.log("data: ",  data)

        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
        );
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("thumbnailImage", data.courseImage);

        // for (var key of formData.entries()) {
        //     console.log(key[0] + ", " + key[1]);
        // }
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
            dispatch(setCourse(result));
            dispatch(setStep(2));
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-white rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
        >
            {/* Course Name */}
            <div>
                <label htmlFor="courseTitle" className="text-sm">
                    Course Title<sup className=" text-pink-200">*</sup>
                </label>
                <input
                    placeholder="Enter Course Title"
                    {...register("courseTitle", { required: true })}
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.courseTitle && <span>Course Title is required.</span>}
            </div>
            {/* CourseDescription */}
            <div>
                <label htmlFor="courseShortDesc" className="text-sm">
                    Course Description<sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc", { required: true })}
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 min-h-[140px]"
                />
                {errors.courseShortDesc && (
                    <span>Course Description is required.</span>
                )}
            </div>

            {/* Course Price */}
            <div className="relative">
                <label htmlFor="coursePrice" className="text-sm">
                    Course Price<sup className=" text-pink-200">*</sup>
                </label>
                <input
                    type="coursePrice"
                    placeholder="Enter Price"
                    {...register("coursePrice", {
                        required: true,
                        valueAsNumber: true,
                    })}
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 py-[12px] px-[40px] text-richblack-5 "
                />
                <HiOutlineCurrencyRupee className="absolute top-[51%] left-3 text-xl text-richblack-400" />
                {errors.coursePrice && <span>Course Price is required.</span>}
            </div>

            {/* Course Category */}
            <div className="flex flex-col ">
                <label htmlFor="courseCategory" className="text-sm">
                    Course Categories<sup className="text-pink-200">*</sup>
                </label>
                <select
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full focus:outline focus:ring-0 focus:outline-yellow-50 rounded-[0.5rem] bg-richblack-700 p-[14px] border-r-[16px] border-transparent text-richblack-5"
                    id="courseCategory"
                    defaultValue={""}
                    {...register("courseCategory", { required: true })}
                >
                    <option value="" disabled>
                        Choose a Category
                    </option>
                    {!loading &&
                        courseCategories.map((category, i) => (
                            <option key={i} value={category?._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                {errors.courseCategories && (
                    <span>Course Category is required</span>
                )}
            </div>

            {/* Tags Input */}

            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Thumbnail upload Component */}

            <Upload
                name={"courseImage"}
                label={"Course Thumbnail"}
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Course Benefits */}
            <div>
                <label htmlFor="courseBenefits" className="text-sm">
                    Benefits of the course<sup className="text-pink-200">*</sup>
                </label>
                <textarea
                    id="courseBenefits"
                    placeholder="Enter Benefits of the course"
                    {...register("courseBenefits", { required: true })}
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 min-h-[140px]"
                />
                {errors.courseShortDesc && (
                    <span>Course Description is required.</span>
                )}
            </div>

            {/* Requirement Field */}
            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4">
                {editCourse && (
                    <button
                        type="button"
                        onClick={() => dispatch(setStep(2))}
                        disabled={loading}
                        className="flex items-center gap-x-2 bg-richblack-700 rounded-lg px-5 py-2"
                    >
                        Continue without saving
                    </button>
                )}
                <IconBtn
                    type="submit"
                    customClasses={
                        "bg-yellow-50 text-richblack-900 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                    }
                    text={editCourse ? "save changes" : "save and continue"}
                />
            </div>
        </form>
    );
};

export default CourseInformationForm;

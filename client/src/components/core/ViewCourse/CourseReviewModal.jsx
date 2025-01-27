import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    };

    return (
        <div className="w-screen h-screen text-white bg-[rgba(0,8,20,0.75)] top-[-3.5rem] left-0 z-10 flex items-center justify-center absolute bg-">
            <div className="flex justify-center flex-col gap-4 rounded-lg bg-richblack-800 text-richblack-5 font-semibold shadow-md overflow-hidden">
                <div className="flex justify-between px-4 py-3 bg-richblack-700 border-b border-richblack-25">
                    {/* Modal Heading */}
                    <p className=" font-medium text-lg">Add a Review</p>
                    <button onClick={() => setReviewModal(false)}>
                        <MdClose />
                    </button>
                </div>
                {/* Modal Body */}
                <div className=" px-8 flex items-center flex-col">
                    <div className="flex gap-4 items-center">
                        <img
                            src={user?.image}
                            alt="Display image"
                            className=" aspect-square w-[50px] rounded-full object-cover"
                        />
                        <div className="text-white font-medium">
                            <p>{`${user?.firstName} ${user?.lastName}`}</p>
                            <p className=" font-normal text-richblack-50 text-sm">
                                Posting Publicly
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col mt-6 items-center"
                    >
                        <ReactStars
                            count={5}
                            onChange={(currentValue) =>
                                setValue("courseRating", currentValue)
                            }
                            size={24}
                            activeColor="#ffd700"
                        />
                        <div className=" font-normal">
                            <label
                                htmlFor="courseExperience"
                                className=" font-normal mb-3 text-richblack-5"
                            >
                                Add your Experience
                                <sup className=" text-pink-200">*</sup>
                            </label>
                            <textarea
                                id="courseExperience"
                                cols="40"
                                rows="10"
                                {...register("courseExperience", {
                                    required: true,
                                })}
                                className="min-h-[130px] w-full text-white text-sm p-2  rounded bg-richblack-600"
                                placeholder="How was your experience?"
                            />
                            {errors.courseExperience && (
                                <span>Share Details of your own experience for this course</span>
                            )}
                        </div>

                        {/* Cancel and Save Button */}

                        <div className=" self-end flex gap-4 my-4">
                            <button
                                type="button"
                                className="bg-richblack-700 text-richblack-5 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-3 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                                onClick={() => setReviewModal(false)}
                            >
                                Cancel
                            </button>
                            <IconBtn
                                customClasses={
                                    "bg-yellow-50 text-richblack-900 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-3 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                                }
                                text={"Save Review"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseReviewModal;

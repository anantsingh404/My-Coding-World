import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/Index";

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);
    // const step = 2;
    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];

    return (
        <>
            <div className="flex justify-center mb-32">
                {steps.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-center items-center"
                    >
                        <div className="relative ">
                            <div
                                key={item.id}
                                className={` w-[40px] h-[40px] flex items-center justify-center text-lg rounded-full ${
                                    step >= item.id
                                        ? " text-yellow-50 bg-yellow-900 border-yellow-50 border"
                                        : "border-richblack-700 bg-richblack-800 text-richblack-300 border"
                                }`}
                            >
                                {step > item.id ? <FaCheck /> : item.id}
                            </div>
                            <p className="absolute translate-x-[-50%] left-[50%] text-center translate-y-2 w-[150px] text-sm">
                                {item.title}
                            </p>
                        </div>
                        {/* Border */}
                        {item.id < steps.length && (
                            <div
                                className={` border-t-2 border-dashed w-[130px] ${
                                    step > item.id
                                        ? "border-yellow-50"
                                        : "border-richblack-600"
                                }`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </>
    );
};

export default RenderSteps;

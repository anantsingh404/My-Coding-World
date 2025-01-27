import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";

const CourseContent = ({ course, totalDuration }) => {
    const subSectionLength = () => {
        const totalSubSections = course?.courseContent.reduce(
            (acc, section) => acc + section?.subSections?.length || 0,
            0
        );
        return totalSubSections;
    };
    const collapseSections = () => {
        const sections = document.querySelectorAll("details");
        sections.forEach((section) => {
            section.removeAttribute("open");
        });
    };
    const lectures = ["lecture 1", "lecture 2", "lecture 3", "lecture 4"];
    console.log("total Duration", course);

    return (
        <div className="w-[80%]">
            <div className="flex flex-col gap-2 justify-start w-[65%]">
                <h2 className="text-2xl font-bold">Course Content</h2>
                <div className=" text-sm flex justify-between">
                    <p>
                        {course?.courseContent?.length} section(s){" "}
                        {subSectionLength()} lecture(s) {`${totalDuration}s`}{" "}
                        total length
                    </p>
                    <p
                        onClick={collapseSections}
                        className="text-yellow-50 cursor-pointer"
                    >
                        Collapse all sections
                    </p>
                </div>
                <div className=" rounded-t-lg rounded-b-lg overflow-hidden ">
                    {course?.courseContent.map((section, i) => (
                        <details
                            className=" bg-richblack-700 transition-all duration-200"
                            key={i}
                        >
                            <summary className="flex justify-between text-sm cursor-pointer p-4">
                                <p className="flex items-center justify-center gap-2">
                                    <IoIosArrowDown className="text-base" />
                                    {section?.sectionName}
                                </p>
                                <p className=" text-yellow-25">
                                    {section?.subSections?.length} lecture(s)
                                </p>
                            </summary>
                            <div className=" bg-richblack-900 text-sm">
                                {lectures.map((subSection, i) => (
                                    <div
                                        key={i}
                                        className={`${
                                            i === lectures.length - 1
                                                ? "rounded-b-lg"
                                                : ""
                                        } pl-8 flex items-center gap-1 p-4 border-x-2 border-b-2 border-richblack-400`}
                                    >
                                        <BsCameraVideo className="text-xs" />
                                        {subSection}
                                    </div>
                                ))}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseContent;

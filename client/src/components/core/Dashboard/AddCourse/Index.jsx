import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
    return (
        <>
            <div className="flex flex-row justify-between text-richblack-5">
                <div className="w-[60%] flex flex-col gap-10">
                    <h1 className=" text-3xl font-medium">Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className="w-[38%]">
                    <div className="flex flex-col gap-2 bg-richblack-800 border border-richblack-700 p-6 rounded-lg w-full mt-[10vh]">
                        <p className=" text-lg font-semibold">
                            ⚡Code Upload Tips
                        </p>
                        <ul className=" text-xs text-richblack-5 font-medium flex justify-center pl-6 flex-col gap-[11px] list-disc">
                            <li>
                                Set the Course Price option or make it free.
                            </li>
                            <li>
                                Standard size for the course thumbnail is
                                1024x576.
                            </li>
                            <li>
                                Video section controls the course overview
                                video.
                            </li>
                            <li>
                                Course Builder is where you create & organize a
                                course.
                            </li>
                            <li>
                                Add Topics in the Course Builder section to
                                create lessons, quizzes, and assignments.
                            </li>
                            <li>
                                Information from the Additional Data section
                                shows up on the course single page.
                            </li>
                            <li>Make Announcements to notify any important</li>
                            <li>Notes to all enrolled students at once.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCourse;

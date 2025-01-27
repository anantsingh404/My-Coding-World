import React from "react";
import Status from "./Status"

const Courses = ({ courses, setCourses }) => {
  const x = "lorem ipsum dolor sit amet tempor invid lorem ipsumsit amet tempor invid lorem ipsumsit amet tempor invid lorem ipsumsit amet tempor invid lorem ipsumsit amet tempor invid lorem ipsum"
    return (
        <div className="flex flex-col gap-10">
            {courses.map((course, i) => (
                <div className="flex justify-between" key={i}>
                    <div className="flex gap-6">
                        <div className=" w-[300px]">
                            <img
                                src={course?.thumbnail}
                                className=" rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <h2 className=" text-xl font-semibold">
                                    {course?.courseName}:
                                </h2>
                                <p className=" text-richblack-100 text-sm">
                                    {/* {course.courseDescription.substring(0, 20)} */}
                                    {x.substring(0,100)}
                                </p>
                            </div>
                            <p></p>
                            <Status status={course?.status}/>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <p>5h 20m</p>
                        <p>$500</p>
                        <div></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Courses;

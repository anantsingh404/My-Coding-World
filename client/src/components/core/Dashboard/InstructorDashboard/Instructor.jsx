import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../common/LoadingSpinner";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            if (instructorApiData?.length) {
                setInstructorData(instructorApiData);
            }
            if (result) {
                setCourses(result);
            }
            setLoading(false);
        };
        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    );
    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled,
        0
    );

    const greetingsArray = ["Hi", "Hello", "Welcome", "Greetings"];
    return (
        <div className=" text-white flex flex-col gap-4">
            <div>
                <h1 className=" text-2xl font-bold">
                    {
                        greetingsArray[
                            Math.floor(Math.random() * greetingsArray.length)
                        ]
                    }
                    , {user?.firstName}
                    <span className="text-xl">👋</span>
                </h1>
                <p>Let's start something new</p>
            </div>
            {loading ? (
                <LoadingSpinner />
            ) : courses.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <div className=" grid gap-2 grid-cols-8">
                        <div className="h-full col-span-6">
                            <InstructorChart courses={instructorData} />
                        </div>
                        <div className=" col-span-2 bg-richblack-800 p-4 border border-richblack-700 text-richblack-5 flex flex-col gap-3">
                            <h2 className="text-xl font-bold">Statistics</h2>
                            <div>
                                <p className="text-lg font-medium text-richblack-100">Total Courses</p>
                                <p className=" text-3xl font-medium">{courses.length}</p>
                            </div>
                            <div>
                                <p className="text-lg font-medium text-richblack-100">Total Students</p>
                                <p className=" text-3xl font-medium">{totalStudents}</p>
                            </div>
                            <div>
                                <p className="text-lg font-medium text-richblack-100">Total Income</p>
                                <p className=" text-3xl font-medium">&#8377; {totalAmount}</p>
                            </div>
                        </div>
                    </div>
                    <div className=" bg-richblack-800 p-4 flex flex-col gap-4 border border-richblack-700">
                        {/* Render 3 Courses */}
                        <div className="flex justify-between">
                            <h3 className="text-xl font-bold">Your Courses</h3>
                            <Link to={"/dashboard/my-courses"}>
                                {" "}
                                <p className=" text-yellow-50 font-medium">
                                    View all
                                </p>{" "}
                            </Link>
                        </div>
                        <div className="flex gap-4">
                            {courses.slice(0, 3).map((course, i) => (
                                <div key={i} className="w-[350px]">
                                    {/* {console.log(course)} */}
                                    <img
                                        src={course.thumbnail}
                                        alt="courseImage"
                                        className=" rounded-md"
                                    />
                                    <div className="flex flex-col gap-2 my-4">
                                        <p className=" text-richblack-5 font-semibold">
                                            {course.courseName}
                                        </p>
                                        <div className="flex gap-2 items-center text-richblack-100 font-medium text-sm">
                                            <p>
                                                {course.studentsEnrolled.length}{" "}
                                                Students
                                            </p>
                                            <p className=" text-xs">|</p>
                                            <p>&#8377; {course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>You have not creaated any Course yet.</p>
                    <Link to={"/dashboard/add-course"}>
                        Click to create Course
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Instructor;

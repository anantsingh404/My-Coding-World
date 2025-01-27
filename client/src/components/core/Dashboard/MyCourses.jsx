import React from "react";
import IconBtn from "../../common/IconBtn";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import CourseTable from "./MyCourses/CourseTable";

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await fetchInstructorCourses(token);
            setCourses(result);
        };
        fetchCourses();
    }, []);
    //console.log("Course: ", courses);

    return (
        <div className="text-richblack-5 w-full h-full flex items-center justify-center flex-col gap-5">
            <div className="flex w-full justify-between mb-5 font-medium">
                <h1 className="text-3xl text-richblack-5 ">My Courses</h1>
                <IconBtn
                    children={<BsPlusCircle />}
                    text="New"
                    customClasses={
                        "bg-yellow-50 text-richblack-900 flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                    }
                    onclick={() => {
                        navigate("/dashboard/add-course");
                    }}
                ></IconBtn>
            </div>
            <CourseTable courses={courses} setCourses={setCourses}/>
        </div>
    );
};

export default MyCourses;

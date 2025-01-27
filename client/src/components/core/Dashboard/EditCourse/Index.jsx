import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";
import LoadingSpinner from "../../../common/LoadingSpinner";

const EditCourse = () => {
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        };
        populateCourseDetails();
    }, []);

    if (loading) {
        return <LoadingSpinner/>;
    }
    //console.log(course)
    return (
        <div className="flex flex-col text-richblack-5 mx-auto w-full">
            <h1 className=" text-3xl font-medium mb-8">Edit Course</h1>
            <div className="flex flex-col w-[70%] mx-auto">{course ? <RenderSteps /> : <p>No Course Found</p>}</div>
        </div>
    );
};

export default EditCourse;

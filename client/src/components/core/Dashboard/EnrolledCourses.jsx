import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className="text-richblack-5 w-full h-full flex flex-col items-center justify-center gap-5">
            <p className="w-full justify-start text-sm text-richblack-300">
                Home / Dashboard /{" "}
                <span className=" text-yellow-50 text-sm font-medium">
                    Enrolled Courses
                </span>
            </p>
            <h2 className="w-full text-3xl text-richblack-5 flex justify-start mb-5 font-medium">
                Enrolled Courses
            </h2>
            {!enrolledCourses ? (
                <LoadingSpinner/>
            ) : (
                <div className="border border-richblack-700 rounded-lg w-full h-full overflow-hidden">
                    <Table>
                        <Thead className=" bg-richblack-700">
                            <Tr className="text-sm">
                                <Th className="text-start font-medium px-4 py-4">
                                    Course Name
                                </Th>
                                <Th className="text-start font-medium px-6 py-4">
                                    Duration
                                </Th>
                                <Th className="text-start font-medium px-6 py-4">
                                    Progress
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!enrolledCourses.length ? (
                                <div className="p-3">
                                    <Tr>
                                        <Td>
                                            You haven't enrolled in any course
                                        </Td>
                                    </Tr>
                                </div>
                            ) : (
                                enrolledCourses.map((course, i) => (
                                    <Tr
                                        className={` cursor-pointer ${
                                            i != enrolledCourses.length - 1
                                                ? "border-b  border-richblack-700"
                                                : ""
                                        }`}
                                        key={i}
                                        onClick={() => {
                                            navigate(
                                                `/view-course/${course?._id}/section/${course?.courseContent?.[0]._id}/sub-section/${course?.courseContent?.[0]?.subSections?.[0]?._id}`
                                            );
                                        }}
                                    >
                                        <Td className="flex gap-3 p-4">
                                            <div className="w-[52px] h-[52px] object-fill ">
                                                <img
                                                    src={course?.thumbnail}
                                                    className="rounded-md object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className=" font-medium">
                                                    {course?.courseName}
                                                </p>
                                                <p className=" text-richblack-300">
                                                    {course?.courseDescription
                                                        .length > 50
                                                        ? `${(course?.courseDescription).substring(
                                                              0,
                                                              50
                                                          )}...`
                                                        : course?.courseDescription}
                                                </p>
                                            </div>
                                        </Td>
                                        <Td><p className="px-6 py-4">{course?.totalDuration}</p></Td>
                                        <Td className="">
                                            <div className="flex items-center justify-start p-4 gap-2 max-w-[250px] mr-0">
                                                <div className="flex flex-col gap-2 w-[90%]">
                                                    <p className=" text-xs text-richblack-50 font-semibold">
                                                        Progress:{" "}
                                                        {course.progressPercentage ||
                                                            0}
                                                        %
                                                    </p>
                                                    <ProgressBar
                                                        completed={
                                                            course.progressPercentage ||
                                                            0
                                                        }
                                                        height="8px"
                                                        isLabelVisible={false}
                                                    />
                                                </div>
                                            </div>
                                        </Td>
                                    </Tr>
                                ))
                            )}
                        </Tbody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;

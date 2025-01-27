import React, { useState } from "react";
import Status from "./Status";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {deleteCourse, fetchInstructorCourses} from "../../../../services/operations/courseDetailsAPI"
import { MdEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { setCourse } from "../../../../slices/courseSlice";

const CourseTable = ({ courses, setCourses }) => {
    const {token} = useSelector((state) => state.auth);
    // const {course} =
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const desc =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, nulla, rerum inventore nisi doloremque veniam laboriosam dolor culpa accusantium magni officia illum impedit odio eveniet natus aut, earum incidunt vitae! Architecto, eveniet suscipit animi placeat iusto tempora amet atque incidunt eos corporis illo corrupti assumenda, consequuntur error qui, ipsam quibusdam? Ipsam veritatis ad, sed cum in officiis, consequuntur ut iure eveniet dolorum accusantium blanditiis beatae corrupti suscipit ipsum? Veniam aliquid maxime sapiente quos facere sequi. Nobis soluta hic aspernatur qui, quae deleniti voluptate, optio officia doloribus minus natus mollitia voluptatibus vero impedit voluptas molestiae? Aliquam odio facilis ducimus quos labore.";

    const courseEditHandler = () => {};
    const handleCourseDelete = async (courseId)=>{
        setLoading(true);
        await deleteCourse({courseId}, token)
        const result = await fetchInstructorCourses(token)
        if(result){
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }

    return (
        <div className="w-full flex flex-col rounded-lg border-[1px] border-richblack-800">
            <Table>
                <Thead className=" border-b border-b-richblack-800">
                    <Tr className=" text-richblack-100 text-sm font-medium uppercase">
                        <Th className="p-4 text-start">Courses</Th>
                        <Th className="p-4 text-start">Duration</Th>
                        <Th className="p-4 text-start">Price</Th>
                        <Th className="p-4 text-start">Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses.length === 0 ? (
                        <Tr>
                            <Td className="p-4 text-start">No Courses Found.<br/>Click on New to create new course.</Td>
                        </Tr>
                    ) : (
                        courses.map((course) => (
                            <Tr key={course?._id}>
                                <Td className="p-4 text-start">
                                    <div className="flex lg:flex-row gap-3 relative flex-col">
                                        <img
                                            src={course?.thumbnail}
                                            className="h-[150px] w-[220px] rounded-lg object-cover"
                                        />
                                        <div className="flex flex-col gap-3 h-full">
                                            <div className="flex flex-col gap-3">
                                                <h2 className=" font-semibold text-xl">
                                                    {course?.courseName}:
                                                </h2>
                                                <p className=" text-richblack-100 text-sm">
                                                    {/* {desc.length>130? (`${desc.substring(0,130)}...`) : desc} */}

                                                    {course?.courseDescription
                                                        .length > 130
                                                        ? `${desc.substring(
                                                              0,
                                                              130
                                                          )}...`
                                                        : course?.courseDescription}
                                                </p>
                                            </div>
                                            <p className=" text-xs text-richblack-25 font-medium">
                                                Created: April 27, 2023 | 05:15
                                                PM
                                            </p>
                                            {/* <div className=" text-sm absolute bottom-0">hello</div> */}
                                            <Status
                                                status={course?.status}
                                                classes=" text-sm lg:absolute bottom-0"
                                            />
                                        </div>
                                    </div>
                                </Td>
                                <Td className="p-4 text-start text-richblack-100 text-sm font-medium">
                                    {course?.duration || "2h 45min"}
                                </Td>
                                <Td className="p-4 text-start text-richblack-100 text-sm font-medium">
                                ₹{course?.price}
                                </Td>
                                <Td className="p-4 text-start text-xl font-medium">
                                    <div className="flex gap-3">
                                        <button
                                            disabled={loading}
                                            className=" cursor-pointer text-richblack-100"
                                            onClick={()=>navigate(`/dashboard/edit-course/${course?._id}`)}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button className=" cursor-pointer text-pink-300" disabled={loading} onClick={()=>setConfirmationModal({
                                            text1: "Do you want to delete this course ?",
                                            text2: "Course will be permanently deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: !loading ? () => {
                                                handleCourseDelete(course._id)
                                            }:()=>{},
                                            btn2Handler: !loading? ()=>{
                                                setConfirmationModal(null)
                                            }:()=>{}
                                        })}>
                                            <RiDeleteBin2Fill />
                                        </button>
                                    </div>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    );
};

export default CourseTable;

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);
    const handleDeleteSection = async (sectionId) => {
      const result = await deleteSection({sectionId, courseId:course._id},token);
      if(result){
        dispatch(setCourse(result))
      }
      setConfirmationModal(null)
    };

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
      const result = await deleteSubSection({subSectionId, sectionId},token);
      if(result){
        const updatedCourseContent = course.courseContent.map((section)=>(
            section._id===sectionId ? result:section
        ))
        //console.log("updatedCourseContent:", updatedCourseContent)
        const updatedCourse = {...course, courseContent: updatedCourseContent}
        dispatch(setCourse(updatedCourse))
      }
      setConfirmationModal(null)
    };

    return (
        <div>
            <div className="text-white mt-10 rounded-lg bg-richblack-700 p-6">
                {course?.courseContent?.map((section, i) => (
                    <details key={i} open className={`${i===0? "":"mt-5"}`}>
                        <summary className="flex items-center justify-between gap-x-3 border-b-2">
                            <div className="flex items-center gap-2">
                                <RxDropdownMenu />
                                <p>{section.sectionName}</p>
                            </div>
                            <div className="flex items-center gap-x-3 text-richblack-300">
                                <button
                                    onClick={() =>
                                        handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn1Handler: () =>
                                                handleDeleteSection(
                                                    section._id
                                                ),
                                            btn2Text: "Cancel",
                                            btn2Handler: () =>
                                                setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line />
                                </button>
                                <span className=" text-[0.65rem] font-semibold">|</span>
                                <BiSolidDownArrow className="text-richblack-300 text-sm" />
                            </div>
                        </summary>
                        <div>
                            {section?.subSections?.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex items-center ml-6 justify-between gap-x-3 border-b-2 border-richblack-5"
                                >
                                    <div className="flex items-center gap-2">
                                        <RxDropdownMenu />
                                        <p>{data?.title}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3 text-richblack-300">
                                        <button
                                            onClick={(e) =>{
                                                e.stopPropagation()
                                                setEditSubSection({
                                                    ...data,
                                                    sectionId: section._id,
                                                })
                                            }
                                            }
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={(e) =>
                                                {
                                                    e.stopPropagation()
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub-Section?",
                                                        text2: "The lectures in this Sub-Section will be deleted",
                                                        btn1Text: "Delete",
                                                        btn1Handler: () =>
                                                            handleDeleteSubSection(
                                                                data._id, section._id
                                                            ),
                                                        btn2Text: "Cancel",
                                                        btn2Handler: () =>
                                                            setConfirmationModal(
                                                                null
                                                            ),
                                                    })
                                                }
                                            }
                                        >
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="flex text-yellow-50 items-center justify-center font-medium outline-2 px-2 py-1 outline mt-4 gap-x-2 outline-yellow-50 rounded-lg" 
                            onClick={()=>{setAddSubSection(section._id)}}>
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>
            {addSubSection ? (
                <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
            ) : viewSubSection ? (
                <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
            ) : editSubSection ? (
                <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
            ) : (
                <div></div>
            )}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    );
};

export default NestedView;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoIosArrowDown,  IoIosArrowBack } from "react-icons/io";
import CourseReviewModal from "./CourseReviewModal";

const VideoDetailsSidebar = ({ setReviewModal }) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);
    useEffect(() => {
        (() => {
            if (!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            );
            const currentSubSectionIndex = courseSectionData?.[
                currentSectionIndex
            ]?.subSections.findIndex((data) => data._id === subSectionId);
            const activeSubSectionId =
                courseSectionData[currentSectionIndex]?.subSections[
                    currentSubSectionIndex
                ]._id;
            //Setting current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //Setting current SubSection here
            setVideoBarActive(activeSubSectionId);
        })();
    }, [courseSectionData, courseEntireData, location.pathname]);

    return (
        <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 text-white">
            <div className="flex flex-col">
                {/* For buttons and heading */}
                <div className="flex flex-col gap-2 p-4">
                    {/* for Buttons */}
                    <div className="flex flex-col gap-2 justify-between pr-4">
                        <button
                            onClick={() =>
                                navigate("/dashboard/enrolled-courses")
                            }
                        >
                            <MdOutlineKeyboardBackspace className=" text-3xl text-yellow-50 " />
                        </button>
                    {/* for heading and title */}
                    <div className="flex items-center gap-4 p-1">
                        <p className=" text-xl font-medium">{courseEntireData?.courseName}</p>
                        <p className=" text-caribbeangreen-200 text-sm text-end">
                            {completedLectures?.length}/{totalNoOfLectures}
                        </p>
                    </div>
                        <IconBtn
                            customClasses={
                                "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-3 py-2 hover:scale-95 transition-all duration-200 hover:shadow-none w-[70%]"
                            }
                            onclick={() => {
                                setReviewModal(true);
                            }}
                            text={"Add Review"}
                        />
                    </div>
                        <div className="my-3 h-[1.5px] bg-richblack-700"></div>
                </div>
                {/* For Sections and Sub Sections */}
                <div className="flex flex-col gap-2">
                    {/* We're mapping for creating sections */}
                    {courseSectionData?.map((section, index) => (
                        <div
                            onClick={() => setActiveStatus(section._id)}
                            key={index}
                            className=" cursor-pointer"
                        >
                            <div className="flex justify-between items-center bg-richblack-700 px-5 py-4 border-y border-richblack-700 font-medium">
                                <div className=" bg-richblack-700">{section?.sectionName}</div>
                                {activeStatus === section?._id ? (
                                    <IoIosArrowDown className="text-lg" />
                                ) : (
                                    <IoIosArrowBack className="text-lg" />
                                )}
                            </div>
                            <div>
                                {activeStatus === section?._id && (
                                    <div>
                                        {section?.subSections.map(
                                            (lecture, i) => (
                                                <div
                                                    className={` flex gap-4 p-3 border-y border-richblack-900 text-sm ${
                                                        videoBarActive ===
                                                        lecture._id
                                                            ? "bg-yellow-200 text-richblack-900"
                                                            : " bg-richblack-800 text-richblack-5"
                                                    }`}
                                                    key={i}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${lecture._id}`
                                                        );
                                                        setVideoBarActive(
                                                            lecture?._id
                                                        );
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={completedLectures.includes(
                                                            lecture._id
                                                        )}
                                                    />
                                                    <span>{lecture.title}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoDetailsSidebar;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    createSubSection,
    updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../CourseInformation/Upload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
    // console.log(modalData, setModalData, add, view, edit)
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { editCourse, course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);
    const isFormUpdated = () => {
        const currentValues = getValues();
        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        }
        return false;
    };

    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectiodId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);
        formData.append(
            "title",
            currentValues.lectureTitle !== modalData.title
                ? currentValues.lectureTitle
                : modalData.title
        );

        formData.append(
            "description",
            currentValues.lectureDesc !== modalData.description
                ? currentValues.lectureDesc
                : modalData.description
        );
        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("videoFile", currentValues.lectureVideo)
        }else{
            formData.append("videoUrl", modalData.videoUrl)
        }
        // formData.append("videoFile", currentValues.lectureVideo!==modalData.videoUrl previ)
        formData.append(
            "timeDuration",
            currentValues.lectureVideo !== modalData.videoUrl
                ? currentValues.lectureVideo.duration
                : modalData.videoUrl.duration
        );
        setLoading(true);
        const result = await updateSubSection(formData, token);
        setLoading(false);

        //Tried using nested map, but it was creating nested array inside an object as it was double mapped, 1 map = 1 arary, hence nested array was created, so instead that i just pushed values inside an empy array and then changed course content

        let updatedSubSectionArray = [];
        course.courseContent.map((section) =>
            section.subSections.map((subSection) =>
                subSection._id === modalData._id ? updatedSubSectionArray.push(result) : updatedSubSectionArray.push(subSection)
            )
        );
        const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData.sectionId ? {...section, subSections: updatedSubSectionArray} : section
        );
        const updatedCourse = {
            ...course,
            courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
        setModalData(null);
    };

    const OnSubmit = async (data) => {
        if (view) {
            return;
        }
        if (edit) {
            if (!isFormUpdated) {
                toast.error("No changes were made");
            } else {
                handleEditSubSection();
            }
            return;
        }
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);
        formData.append("timeDuration", data.lectureVideo.duration);

        setLoading(true);
        const result = await createSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            );
            const updatedCourse = {
                ...course,
                courseContent: updatedCourseContent,
            };
            dispatch(setCourse(updatedCourse));
            setModalData(null);
        }
        setLoading(false);
    };

    return (
        <div className="h-[100vh] w-[100vw] bg-opacity-75 bg-richblack-900 absolute -top-[3.5rem] left-0 flex justify-center items-center">
            <div className=" bg-richblack-800 rounded-lg w-[35%]">
                <div className=" flex justify-between bg-richblack-700 rounded-t-lg py-2 px-4">
                    <p>
                        {view && "Viewing"}
                        {edit && "Editing"}
                        {add && "Adding"} Lecture
                    </p>
                    <button onClick={() => !loading && setModalData(null)}>
                        <RxCross1 />
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit(OnSubmit)}
                    className="flex flex-col gap-4 p-5"
                >
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="lectureTitle" className="text-sm">
                            Lecture Title
                            <span className=" text-pink-200">*</span>
                        </label>
                        <input
                            type="text"
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className={`w-full rounded-[0.5rem] bg-richblack-600 py-2 px-3 pr-12 text-richblack-5 text-sm ${
                                view && "outline-none"
                            }`}
                            readOnly={view}
                        />
                        {errors.lectureTitle && (
                            <span>Please enter lecture title.</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="lectureDesc" className=" text-sm">
                            Course Description
                            <span className=" text-pink-200">*</span>
                        </label>
                        <textarea
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            style={{
                                boxShadow:
                                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className={`w-full rounded-[0.5rem] bg-richblack-600 py-2 px-3 pr-12 text-richblack-5 min-h-[130px] text-sm ${
                                view && "outline-none resize-none"
                            }`}
                            readOnly={view}
                        />
                        {errors.lectureDesc && (
                            <span>Please enter lecture description</span>
                        )}
                    </div>

                    {!view && (
                        <IconBtn
                            customClasses={
                                "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-4 py-2 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                            }
                            text={
                                loading
                                    ? "loading..."
                                    : edit
                                    ? "Save Changes"
                                    : "Create"
                            }
                        />
                    )}
                </form>
            </div>
        </div>
    );
};

export default SubSectionModal;

import React from "react";
import { useState, useEffect } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { AiOutlineRedo } from "react-icons/ai";
import { useSelector } from "react-redux";

const Upload = ({
    name,
    label,
    register,
    errors,
    video = false,
    setValue,
    getValues,
    viewData,
    editData,
}) => {
    const { editCourse, course } = useSelector((state) => state.course);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const handleThumbnailUpload = (e) => {
        // console.log(e.target.files[0]);
        setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
        setThumbnail(e.target.files[0]);
    };

    useEffect(() => {
        if (editCourse) {
            setThumbnailPreview(course?.thumbnail);
        }
        if (editData) {
            setThumbnailPreview(editData);
        }
        if (viewData) {
            setThumbnailPreview(viewData);
        }
        register(name, {
            required: true,
        });
    }, []);

    useEffect(() => {
        setValue(name, thumbnail);
    }, [thumbnail]);

    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-sm">
                {label}
                <sup className="text-pink-200">*</sup>
            </h3>
            <div className=" bg-richblack-700 border-2 border-dotted border-richblack-600 rounded-lg p-3 h-[330px] flex items-center justify-center">
                <input
                    type="file"
                    accept={video ? ".mp4, .mkv" : ".jpg, .jpeg, .png, .gif"}
                    id={name}
                    className=" hidden"
                    onChange={handleThumbnailUpload}
                />
                {thumbnailPreview ? (
                    <div className="h-[95%] w-full flex flex-col justify-start items-center gap-3">
                        {video ? (
                            <video
                                className="h-[90%] rounded-lg text-caribbeangreen-25 block"
                                src={thumbnailPreview}
                                autoPlay
                                loop
                                muted
                                controls
                            ></video>
                        ) : (
                            <img
                                src={thumbnailPreview}
                                className="h-[90%] rounded-lg"
                            />
                        )}
                        {!viewData && (
                            <label
                                htmlFor={name}
                                className="flex items-center justify-center bg-richblack-5 text-yellow-900 font-medium cursor-pointer px-2 gap-1 rounded-full"
                            >
                                <AiOutlineRedo />
                                Re-Upload
                            </label>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center flex-col">
                        <label
                            htmlFor={name}
                            className="text-yellow-50 text-2xl bg-pure-greys-800 rounded-full p-3 cursor-pointer"
                        >
                            <FiUploadCloud />
                        </label>
                        <p className=" text-xs font-semibold text-richblack-200 w-[50%] text-center">
                            Drag and drop an image, or{" "}
                            <label
                                htmlFor={name}
                                className="cursor-pointer text-yellow-50"
                            >
                                Browse
                            </label>{" "}
                            Max 6MB each (12MB for videos)
                        </p>
                        <ul className="text-xs font-semibold text-richblack-400 list-disc flex gap-12 mt-12 justify-center px-5">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upload;

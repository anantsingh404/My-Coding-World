import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import { toast } from "react-hot-toast";

const UpdateProfilePicture = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(user?.image);
    const [displayPicture, setDisplayPicture] = useState(null);

    const imageHandler = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setDisplayPicture(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if(!displayPicture){
            toast.error("Please upload image before uploading")
            return
        }
        try {
            // console.log("uploading...");
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", displayPicture);
            // console.log("formdata", formData)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            });
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    };

    return (
        <div className="flex flex-row justify-between w-[80%] items-center bg-richblack-800 p-6 border-richblack-700 border rounded-lg">
            <div className="flex items-center gap-4">
                <img
                    src={imagePreview || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className=" aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                    <p className=" font-medium text-richblack-25">
                        Change Profile Picture
                    </p>
                    <div className="flex gap-4">
                        <input
                            type="file"
                            name="displayPicture"
                            id="displayPicture"
                            accept=".jpg, .jpeg, .png, .gif"
                            // value={"displayPicture"}
                            onChange={imageHandler}
                            hidden
                        />
                        <label
                            htmlFor="displayPicture"
                            className="bg-richblack-700 cursor-pointer border border-richblack-600 text-richblack-50 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                        >
                            Select
                        </label>
                        <IconBtn
                            children={<FiUpload />}
                            text="Upload"
                            customClasses={
                                "bg-yellow-50 text-richblack-900 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-2 border border-yellow-5"
                            }
                            onclick={() => {
                                handleFileUpload();
                            }}
                        ></IconBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePicture;

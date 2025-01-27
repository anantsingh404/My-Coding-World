import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className=" bg-[rgba(255,255,255,0.5)] top-[-3.5rem] left-0 z-10 h-[100vh] w-[100vw] absolute flex justify-center items-center">
            <div className="flex justify-center flex-col gap-4 p-6 rounded-lg bg-richblack-900 text-richblack-800 font-semibold border shadow-md border-richblack-25">
                <p className=" text-xl text-richblack-5">{modalData.text1}</p>
                <p className=" font-normal text-richblack-300">{modalData.text2}</p>
                <div className="w-full flex gap-4">
                    <IconBtn
                    customClasses={
                        "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2"
                    }
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />
                    <button className=" bg-richblack-400 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-2" onClick={modalData?.btn2Handler}>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

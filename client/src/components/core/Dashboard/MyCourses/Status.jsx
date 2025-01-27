import React from "react";
import { AiFillClockCircle, AiFillCheckCircle } from "react-icons/ai";

const Status = ({ status, classes}) => {
    return (
        <div className={`w-fit ${classes}`}>
            {status !== "Published" ? (
                <div className="text-pink-100 font-medium text-xs flex gap-[6px] items-center rounded-full bg-richblack-700 px-2 py-1">
                    <AiFillClockCircle className=" text-sm" />
                    Drafted
                </div>
            ) : (
                <div className="text-yellow-100 font-medium text-xs flex gap-[6px] items-center rounded-full bg-richblack-700 px-2 py-1 max-w-maxContent">
                    <AiFillCheckCircle className=" text-sm" />
                    Published
                </div>
            )}
        </div>
    );
};

export default Status;

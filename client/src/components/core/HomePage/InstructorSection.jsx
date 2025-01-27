import React from "react";
import instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
    return (
        <div className="mt-16">
            <div className=" flex lg:flex-row flex-col gap-20 items-center">
                <div className=" lg:w-[50%] w-[80%]">
                    <img
                        src={instructor}
                        alt="instructorImage"
                        // className=" shadow-[-20px_20px_0px_0px_#FFF]"
                        className=" border-[20px] border-richblack-25"
                        width={450}
                    />
                </div>
                <div className=" flex flex-col lg:w-[50%] w-[80%] justify-center gap-10">
                    <div className=" md:text-4xl text-3xl font-semibold justify-center">
                        <h2>Become an</h2>
                        <HighlightText text={"Instructor"}></HighlightText>
                    </div>
                    <p className=" text-richblack-300 font-medium w-[82%]">
                        Instructors from around the world teach millions of
                        students on EduNxt. We provide the tools and skills to
                        teach what you love.
                    </p>
                    <div className="w-fit mt-2">
                        <CTAButton
                            active={true}
                            shadow={true}
                            linkto={"/signup"}
                        >
                            <div className="flex flex-row justify-center items-center gap-2">
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor;

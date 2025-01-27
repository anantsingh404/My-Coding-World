import React from "react";
import HighlightText from "./HighlightText";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg";
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import CTAButton from "./CTAButton";

const LearningLanguageSection = () => {
    return (
        <div className="text-black mt-[100px] mb-[90px] ">
            <div className="flex flex-col items-center gap-5">
                <div className="md:text-4xl text-3xl font-semibold lg:text-start text-center">
                    Your swiss knife for
                    <HighlightText
                        text={` learning any language`}
                    ></HighlightText>
                </div>
                <div className="text-richblack-700 font-medium text-center lg:w-[70%] w-[90%]">
                    Using spin making learning multiple languages easy. with 20+
                    languages realistic voice-over, progress tracking, custom
                    schedule and more.
                </div>
                <div className="flex lg:flex-row flex-col items-center justify-center mt-5 ">
                    <img
                        src={Know_your_progress}
                        alt="KnowYourProgressImage"
                        className=" object-contain lg:-mr-36 lg:-mt-10"
                    />
                    <img
                        src={Compare_with_others}
                        alt="CompareWithOthersImage"
                        className=" object-contain"
                    />
                    <img
                        src={Plan_your_lesson}
                        alt="PlanYourLesson"
                        className=" object-contain lg:-ml-36 -mt-14"
                    />
                </div>
                <div>
                    <CTAButton shadow={false} active={true} linkto={"/signup"}>
                        Learn more
                    </CTAButton>
                </div>
            </div>
        </div>
    );
};

export default LearningLanguageSection;

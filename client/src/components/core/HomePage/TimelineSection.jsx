import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success students.",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority.",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "Ability to switch is an important skill.",
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution.",
    },
];

const TimelineSection = () => {
    return (
        <div className="flex lg:flex-row flex-col gap-24 items-center">
            <div className="flex flex-col lg:gap-1 lg:w-[45%]">
                {timeline.map((element, index) => {
                    return (
                        <div key={index}>
                            <div className=" flex flex-row gap-8 items-center">
                                <div className="flex w-[50px] h-[50px] rounded-full bg-white items-center justify-center shadow-md">
                                    <img
                                        className="top-[8px] left-[11px]"
                                        src={element.Logo}
                                        alt="logo"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="font-semibold text-[18px]">
                                        {element.Heading}
                                    </h2>
                                    <p className="text-base">
                                        {element.Description}
                                    </p>
                                </div>
                            </div>
                            {index === timeline.length - 1 ? (
                                ""
                            ) : (
                                <div className="border-l-2 border-richblack-400 h-6 border-dotted w-[100%] translate-x-[5.3%] lg:my-1"></div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div>
                <div className="relative shadow-[0px_-5px_40px_0px_#4299e1]">
                    <img
                        src={TimelineImage}
                        alt="TimelineImage"
                        width="650px"
                        className="shadow-[20px_20px_0px_0px_#F5F5F5]"
                    />
                    <div className="absolute flex items-center text-white bg-caribbeangreen-700 py-8 px-4 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex justify-center items-center border-r border-caribbeangreen-300 px-7 gap-12 w-[50%]">
                            <p className="text-3xl font-semibold">20</p>
                            <p className="text-sm uppercase text-caribbeangreen-300">
                                years of experience
                            </p>
                        </div>
                        <div className="flex justify-center items-center px-7 gap-11 w-[50%]">
                            <p className="text-3xl font-semibold w-[]">300</p>
                            <p className="text-sm uppercase text-caribbeangreen-300">
                                types of courses
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineSection;

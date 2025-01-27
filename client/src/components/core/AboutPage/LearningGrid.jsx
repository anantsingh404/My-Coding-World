import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/CTAButton";

const LearningGrid = () => {
    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description:
                "EduNxt partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "EduNxt partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "EduNxt partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "EduNxt partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "EduNxt partners with more than 275+ leading universities and companies to bring",
        },
    ];

    return (
        <div className="grid mx-auto lg:grid-cols-4 grid-cols-1 py-24 px-32">
            {LearningGridArray.map((card, i) => (
                <div
                    key={i}
                    className={`${i === 0 && "col-span-2"} lg:h-[300px] ${
                        card.order % 2 !== 0
                            ? "bg-richblack-700"
                            : "bg-richblack-800"
                    } flex flex-col justify-start gap-3 ${
                        card.order === 3 && "lg:col-start-2"
                    }`}
                >
                    {card.order < 0 ? (
                        <div className="flex flex-col gap-6 p-8 bg-transparent">
                            <div className=" text-richblack-5 font-semibold text-4xl">
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className="text-richblack-300">
                                {card.description}
                            </p>
                            <div className="w-fit">
                                <CTAButton
                                    className=""
                                    active={true}
                                    shadow={true}
                                    linkto={card.BtnLink}
                                >
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 p-8 h-full">
                            <h2 className="text-richblack-5 font-semibold text-lg">
                                {card.heading}
                            </h2>
                            <p className="text-richblack-100">
                                {card.description}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LearningGrid;

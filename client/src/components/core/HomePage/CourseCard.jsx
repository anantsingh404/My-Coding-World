import React from "react";
import { BsPeopleFill } from "react-icons/bs";
import { TbBinaryTree2 } from "react-icons/tb";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    return (
        <div
            className={`flex flex-col gap-5 w-[360px] lg:w-[30%] h-[300px] ${
                cardData.heading===currentCard ? "bg-white" : "bg-richblack-800"
            } justify-center text-[16px] box-border cursor-pointer ${
                cardData.heading===currentCard ? " shadow-[10px_10px_0px_0px_rgb(255,214,10)]" : ""
            }`}
            onClick={()=>setCurrentCard(cardData.heading)}
        >
            <div className="h-[80%] border-b-[2px] border-dashed border-richblack-400 p-6">
                <h2
                    className={`text-[20px] font-semibold ${
                        cardData.heading===currentCard
                            ? "text-richblack-800"
                            : " text-richblack-25"
                    } mb-2`}
                >
                    {cardData.heading}
                </h2>
                <p className="text-richblack-500">{cardData.description}</p>
            </div>
            <div
                className={`flex justify-between px-6 pb-4 ${
                    cardData.heading===currentCard? " text-blue-500" : "text-richblack-300"
                } items-end `}
            >
                <div className={`flex flex-row items-center gap-2`}>
                    <BsPeopleFill />
                    {cardData.level}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <TbBinaryTree2 />
                    {cardData.lessonNumber}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;

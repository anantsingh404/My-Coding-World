import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import "./codeblock.css"

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    codeColor,
    backgroundGradient,
}) => {


    return (
        <div className={`flex ${position} flex-col justify-between gap-20 lg:my-28 my-20 w-[100%]`}>

            <div className="flex flex-col gap-8 lg:w-[55%] w-[90%]">
                {heading}
                <div className=" text-richblack-300 font-medium">
                    {subheading}
                </div>
                <div className="flex flex-row gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>
            <div className="flex flex-row gap-0 lg:w-[35%] w-[90%] h-fit text-[14px] leading-[22px] py-4 code-border">
                <div className=" text-center flex flex-col w-[10%] text-richblack-400 font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>
                <div
                    className={` w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-2`}
                >
                    <div className={`${position.includes("reverse")? "codeblock1":"codeblock2"} absolute translate-x-5`}></div>
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={{ whiteSpace: "pre-line", display: "block" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;

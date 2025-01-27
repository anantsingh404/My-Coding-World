import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";
// import Instructor from "../assets/Images/Instructor.png"
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewSection from "../components/core/HomePage/ReviewSection";
import FooterSection from "../components/common/FooterSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className=" relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center justify-between text-white">
                <Link to={"/signup"}>
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-medium text-[16px] text-richblack-200 transition-all duration-200 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] border-richblack-800 hover:scale-95 hover:drop-shadow-none">
                        <div className=" flex flex-row gap-2 items-center rounded-full px-[18px] py-[6px] duration-200 transition-all group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                <div className=" text-center md:text-4xl text-3xl font-semibold mt-7">
                    Education for
                    <HighlightText text={"Next Generation"}></HighlightText>
                </div>

                <div className=" text-richblack-300 md:text-lg text-base font-medium w-[90%] mt-4 text-center">
                    With our online coding courses, you can learn at your own
                    pace, from anywhere in the world, and get access to a wealth
                    of resources, including hands-on projects, quizzes, and
                    personalized feedback from instructors.
                </div>

                <div className=" flex flex-row mt-12 gap-6">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn more!
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book a demo
                    </CTAButton>
                </div>

                <div className="mt-16 shadow-[0px_-5px_40px_-7px_#4299e1] h-[90%] w-[90%]">
                    <video
                        muted
                        autoPlay
                        loop
                        src={Banner}
                        type="video/mp4"
                        className="h-fit shadow-[20px_20px_0px_0px_#F5F5F5]"
                    ></video>
                </div>

                {/* CodeBlock 1 */}
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className=" md:text-4xl text-3xl font-semibold">
                            Unlock your
                            <HighlightText
                                text={" coding potential "}
                            ></HighlightText>
                            with our online courses.
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={{
                        btnText: "Try it Yourself",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }}
                    codeblock={`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <title>Document</title>
                    </head>
                    <body>
                        <h1>Let's Learn</h1>
                        <h2>HTML</h2>
                    </body>
                    </html>`}
                    codeColor="text-yellow-25"
                ></CodeBlocks>

                {/* CodeBlock 2 */}
                <CodeBlocks
                    position={"lg:flex-row-reverse lg:mt-0 mt-[-30px]"}
                    heading={
                        <div className=" md:text-4xl text-3xl font-semibold">
                            Start
                            <HighlightText
                                text={" coding in seconds "}
                            ></HighlightText>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={{
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }}
                    ctabtn2={{
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }}
                    codeblock={`const App = () => {
                        const [isModal,setModal] = useState(false);
                        return (
                          <>
                            <button onClick={()=>setModal()}>Click</button>
                            <Modal onClose={()=>setModal(false)} />
                            <GenerateCodeAnimation />
                          </>
                        );
                      };`}
                    codeColor="text-blue-25"
                ></CodeBlocks>

                {/* Unlock the power of Code */}
                <ExploreMore />
            </div>

            {/* Section 2 */}
            <div className=" bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[320px]">
                    <div className=" w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto">
                        <div className="h-[150px]"></div>
                        <div className="flex flex-row text-white gap-7">
                            <CTAButton active={true} shadow={false} linkto={""}>
                                <div className="flex flex-row items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton
                                shadow={false}
                                active={false}
                                linkto={"/signup"}
                            >
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>
                <div className="flex mx-auto flex-col max-w-maxContent w-11/12 items-center justify-between gap-7">
                    <div className="flex lg:flex-row flex-col justify-around gap-5 mt-[90px]">
                        <div className="lg:w-[45%] md:text-4xl text-3xl font-semibold">
                            <div>
                                Get the Skills you need for a
                                <HighlightText
                                    text={"job that is in demand."}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                            <div className=" text-[16px] ">
                                The modern EduNxt is the dictates its own terms.
                                Today, to be a competitive specialist requires
                                more than professional skills.
                            </div>
                            <CTAButton
                                shadow={false}
                                active={true}
                                linkto={"/signup"}
                            >
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                    <TimelineSection />
                    {/* <LearningLanguageSection /> */}
                </div>
            </div>

            {/* Section 3 */}
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center text-white gap-40 mt-20">
                <InstructorSection />
                <ReviewSection />
            </div>

            {/* Footer */}
            <div className="flex bg-richblack-800 justify-center items-center">
                <FooterSection />
            </div>
        </div>
    );
};

export default Home;

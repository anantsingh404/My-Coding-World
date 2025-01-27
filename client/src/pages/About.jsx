import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import FooterSection from "../components/common/FooterSection";
import ReviewSection from "../components/core/HomePage/ReviewSection";

const About = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            {/* Section 1 */}
            <section className="relative h-[60vh] pt-[90px] w-full flex flex-col gap-6 text-center bg-richblack-800 pb-[28%] items-center overflow-visible">
                <div className="text-richblack-5 text-4xl font-semibold w-[50%]">
                    <header>
                        Driving Innovation in Online Education for a
                        <HighlightText text={"Brighter Future"} />
                    </header>
                </div>
                <p className=" text-richblack-300 w-[50%]">
                    EduNxt is at the forefront of driving innovation in
                    online education. We're passionate about creating a brighter
                    future by offering cutting-edge courses, leveraging emerging
                    technologies, and nurturing a vibrant learning community.
                </p>
                <div className="lg:absolute flex lg:flex-row flex-col gap-4 justify-center w-full lg:bottom-[-20%]">
                    <div>
                        <img src={aboutus1} alt="about us: 1" />
                    </div>
                    <div>
                        <img src={aboutus2} alt="about us: 2" />
                    </div>
                    <div>
                        <img src={aboutus3} alt="about us: 3" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="mt-[110px] py-14 text-4xl font-semibold border-b border-richblack-700">
                <div>
                    <Quote />
                </div>
            </section>

            {/* Section 3 */}
            <section>
                <div>
                    {/* Founding Story div */}
                    <div className="flex flex-row justify-center gap-32 h-full py-[90px]">
                        <div className="flex flex-col text-richblack-300 w-[35%] gap-4 h-full">
                            <h2 className="text-4xl font-semibold mb-4 redHighlightText">
                                Our Founding Story
                            </h2>
                            <p>
                                Our e-learning platform was born out of a shared
                                vision and passion for transforming education.
                                It all began with a group of educators,
                                technologists, and lifelong learners who
                                recognized the need for accessible, flexible,
                                and high-quality learning opportunities in a
                                rapidly evolving digital world.
                            </p>
                            <p>
                                As experienced educators ourselves, we witnessed
                                firsthand the limitations and challenges of
                                traditional education systems. We believed that
                                education should not be confined to the walls of
                                a classroom or restricted by geographical
                                boundaries. We envisioned a platform that could
                                bridge these gaps and empower individuals from
                                all walks of life to unlock their full
                                potential.
                            </p>
                        </div>
                        <div className="w-[35%] flex h-full items-center justify-center">
                            <img
                                src={FoundingStory}
                                alt="about us: founding story"
                            />
                        </div>
                    </div>

                    {/* Vision and Mission div */}
                    <div className="flex flex-row gap-32 text-richblack-300 justify-center items-center py-[90px]">
                        <div className="w-[35%] flex flex-col gap-14">
                            <h2 className="text-4xl font-semibold orangeHighlightText">
                                Our Vision
                            </h2>
                            <p className=" text-richblack-300">
                                With this vision in mind, we set out on a
                                journey to create an e-learning platform that
                                would revolutionize the way people learn. Our
                                team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that
                                combines cutting-edge technology with engaging
                                content, fostering a dynamic and interactive
                                learning experience.
                            </p>
                        </div>
                        <div className="w-[35%] flex flex-col gap-14">
                            <h2 className="text-4xl font-semibold">
                                <HighlightText text={"Our Mission"} />
                            </h2>
                            <p className=" text-richblack-300">
                                our mission goes beyond just delivering courses
                                online. We wanted to create a vibrant community
                                of learners, where individuals can connect,
                                collaborate, and learn from one another. We
                                believe that knowledge thrives in an environment
                                of sharing and dialogue, and we foster this
                                spirit of collaboration through forums, live
                                sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4 */}
            <StatsComponent />

            {/* Section 5 */}
            <section>
                <LearningGrid />
            </section>

            {/* Section 6 */}
            <section className="flex justify-center items-center w-full">
                <ContactFormSection />
            </section>

            {/* Section 7 */}
            <section className="text-richblack-300 text-4xl my-[100px] w-11/12">
                <div className="w-full flex items-center flex-col gap-8">
                    <p>Reviews from other learners</p>
                    <ReviewSection />
                </div>
            </section>

            <section className="w-full">
                <FooterSection />
            </section>
        </div>
    );
};

export default About;

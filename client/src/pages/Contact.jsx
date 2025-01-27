import React from "react";
import FooterSection from "../components/common/FooterSection";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
import ReviewSection from "../components/core/HomePage/ReviewSection";

const Contact = () => {
    return (
        <div>
            <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                {/* Contact Details */}
                <div className="lg:w-[40%]">
                    <ContactDetails />
                </div>

                {/* Contact Form */}
                <div className="lg:w-[60%]">
                    <ContactForm />
                </div>
            </div>
            <div className="relative mx-auto my-20 flex flex-col items-center justify-between gap-8 bg-richblack-900 text-richblack-300 w-11/12">
                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl mt-8 w-full">
                    Reviews from other learners
                </h1>
                <ReviewSection />
            </div>
            <FooterSection />
        </div>
    );
};

export default Contact;

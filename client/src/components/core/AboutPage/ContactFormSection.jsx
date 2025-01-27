import React from "react";
import ContactUsForm from "../../common/ContactUsForm";

const ContactFormSection = () => {
    return (
        <div className="mx-auto items-center flex flex-col gap-4">
            <h1 className="text-richblack-5 font-semibold text-4xl">Get in Touch</h1>
            <p className="text-richblack-300">We'd love to here for you, Please fill out this form.</p>
            <div className="flex justify-center mt-8">
                <ContactUsForm />
            </div>
        </div>
    );
};

export default ContactFormSection;

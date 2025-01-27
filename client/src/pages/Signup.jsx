import React from "react";
import Template from "../components/core/Auth/Template";
import signupImg from "../assets/Images/signup.png";

const SignUp = () => {
    return (
        <Template
            title="Join the Next Gen Edu-Tech platform for Free"
            description1="Build skills Faster and Better."
            description2="AI powered education to kickstart journey with a leap."
            image={signupImg}
            formType="signup"
        />
    );
};

export default SignUp;

import React from "react";
import loginImg2 from "../assets/Images/login.png";
import Template from "../components/core/Auth/Template";

const Login = () => {
    return (
        <Template
            title="Welcome Back"
            description1="Build skills Faster and Better."
            description2="AI powered education to kickstart journey with a leap."
            image={loginImg2}
            formType="login"
        />
    );
};

export default Login;

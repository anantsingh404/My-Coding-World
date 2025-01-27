import React from "react";
import "./HighlightText.css";

const HighlightText = ({ text }) => {
    return (
        <span className="font-bold highlighted text-richblue-200"> {text}</span>
    );
};

export default HighlightText;

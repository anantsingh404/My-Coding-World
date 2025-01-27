import React from "react";

const IconBtn = ({
    text,
    onclick,
    children,
    disabled=false,
    customClasses,
    type,
}) => {
    return (
        <button disabled={disabled} onClick={onclick} type={type} className={customClasses}>
            {
                children? (
                    <>
                        <span>{text}</span>
                        {children}
                    </>
                ):(text)
            }
        </button>
    );
};

export default IconBtn;

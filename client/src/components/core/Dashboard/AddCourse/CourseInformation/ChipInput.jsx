import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const ChipInput = ({ label, name, errors, register, setValue }) => {

    const { editCourse, course } = useSelector((state) => state.course);
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if(editCourse){
            setChips(course?.tag)
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        });
    }, []);

    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const chipValue = e.target.value.trim();
            if (chipValue && !chips.includes(chipValue)) {
                const newChips = [...chips, chipValue]
                setChips(newChips);
            }
            e.target.value = "";
        }
    };

    const handleRemoveChip = (index) => {
        const updatedChips = [...chips];
        updatedChips.splice(index, 1);
        setChips(updatedChips);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-sm">
                {label}
                <sup className=" text-pink-200">*</sup>
            </label>
            <input
                type="text"
                onKeyDown={handleKeyDown}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[10px] mb-2 text-richblack-5"
            />
            {
                <div className="flex gap-2">
                    {chips.map((item, i) => (
                        <span key={i} className="flex items-center justify-center text-xs gap-1 bg-yellow-50 rounded-full px-2 py-1 text-richblack-900 cursor-pointer" onClick={handleRemoveChip}>
                            {item}
                            <RxCross2 />
                        </span>
                    ))}
                </div>
            }
            {errors[name] && <span>{label} are required.</span>}
        </div>
    );
};

export default ChipInput;

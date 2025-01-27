import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const RequirementField = ({
    name,
    label,
    register,
    errors,
    setValue,
    getValues,
}) => {
    const { editCourse, course } = useSelector((state) => state.course);
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions);
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        });
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    const handleAddRequirements = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            //Used prevent default as in default, pressing enter was call "OnSubmit function, did same in Tags"
            e.preventDefault();
            handleAddRequirements();
        }
    };

    const handleRemoveRequirements = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    return (
        <div className="w-full">
            <label htmlFor={name} className="text-sm">
                {label}
                <sup className=" text-pink-200">*</sup>
            </label>
            <div className="w-full">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => {
                        setRequirement(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    style={{
                        boxShadow:
                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] mb-2 text-richblack-5"
                />
                <button
                    type="button"
                    onClick={() => handleAddRequirements()}
                    className=" text-yellow-50 text-semibold text-start w-full"
                >
                    Add
                </button>
            </div>
            {requirementList.length > 0 && (
                <ul>
                    {requirementList.map((item, i) => (
                        <li
                            key={i}
                            className=" flex items-center text-richblack-5 gap-1"
                        >
                            {item}
                            <button
                                onClick={() => handleRemoveRequirements(i)}
                                className="text-xs text-pure-greys-300"
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {errors[name] && <span>{label} are required.</span>}
        </div>
    );
};

export default RequirementField;

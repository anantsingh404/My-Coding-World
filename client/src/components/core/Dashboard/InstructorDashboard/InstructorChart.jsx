import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorChart = ({ courses }) => {
    const [currentChart, setCurrentChart] = useState("Students");

    //To generate Random colors
    const RandomColor = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgba(${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, 1)`;
            colors.push(color);
        }
        return colors;
    };

    const dataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                label: "Students Enrolled",
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: RandomColor(courses.length),
                borderWidth: 0,
            },
        ],
    };

    const dataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                label: "Income",
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: RandomColor(courses.length),
                borderWidth: 0,
            },
        ],
    };

    //Create data to display chart for student info

    //Create data to display chart for income info

    return (
        <div className="w-full h-full bg-richblack-800 p-4 flex flex-col gap-4 border border-richblack-700">
            <p className=" text-xl font-bold">Visualize</p>
            <div>
                <div className="flex gap-2 max-w-max p-1 rounded-full">
                    <button
                        onClick={() => setCurrentChart("Students")}
                        className={`font-medium px-3 py-1 rounded-full ${
                            currentChart === "Students"
                                ? "text-yellow-50 bg-richblack-700"
                                : ""
                        }`}
                    >
                        Students
                    </button>
                    <button
                        onClick={() => setCurrentChart("Income")}
                        className={`font-medium px-3 py-1 rounded-full ${
                            currentChart === "Income"
                                ? "text-yellow-50 bg-richblack-700"
                                : ""
                        }`}
                    >
                        Income
                    </button>
                </div>
            </div>
            <div className=" max-h-[500px] lg:h-[500px] mx-auto lg:w-[500px]">
                <Doughnut
                    data={
                        currentChart === "Students"
                            ? dataForStudents
                            : dataForIncome
                    }
                />
            </div>
        </div>
    );
};

export default InstructorChart;

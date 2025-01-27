import React from "react";

const StatsComponent = () => {
    const stats = [
        {
            count: "5k",
            label: "Active Students",
        },
        {
            count: "10+",
            label: "Mentors",
        },
        {
            count: "200+",
            label: "Courses",
        },
        {
            count: "50+",
            label: "Awards",
        },
    ];

    return (
        <section className="w-full">
            <div className=" bg-richblack-800 py-12 px-8 flex flex-row justify-evenly w-full">
            {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                    <h3 className="text-richblack-5 text-3xl font-bold mb-2">{stat.count}</h3>
                    <p className=" text-richblack-300 font-semibold">{stat.label}</p>
                </div>
            ))}
        </div>
        </section>
    );
};

export default StatsComponent;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { apiConnector } from "../services/apiconnector";
import CourseSlider from "../components/core/CatalogPage/CourseSlider";
import FooterSection from "../components/common/FooterSection";
import CourseCard from "../components/core/CatalogPage/CourseCard";

const Catalog = () => {
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const tabs = ["Most Popular", "New"];
    const [coursesType, setCoursesType] = useState(tabs[0]);

    useEffect(() => {
        const getCategory = async () => {
            setLoading(true);
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = res?.data?.data?.filter(
                (ct) => ct.name.replace(" ", "-").toLowerCase() === catalogName
            )[0]._id;
            setCategoryId(category_id);
        };

        getCategory();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            } catch (err) {
                console.log("Error in fetching category details", err);
            }
            setLoading(false);
        };
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    const changeCourses = (name) => {
        setCoursesType(name);
    };
    // console.log("loading: ", loading);
    return (
        <div>
            {loading ? (
                ""
            ) : (
                <div className=" text-richblack-5 w-full mx-auto">
                    <div className="bg-richblack-800 p-10">
                        <div className="w-[70%] flex flex-col gap-3 mx-auto">
                            <p className="text-richblack-300 text-sm">
                                {`Home / Catalog / `}
                                <span className=" font-medium text-yellow-50">
                                    {
                                        catalogPageData?.data?.selectedCategory
                                            ?.name
                                    }
                                </span>
                            </p>
                            <h2 className=" text-3xl font-medium">
                                {catalogPageData?.data?.selectedCategory?.name}
                            </h2>
                            <p>
                                {
                                    catalogPageData?.data?.selectedCategory
                                        ?.description
                                }
                            </p>
                        </div>
                    </div>
                    <div className="sm:w-[70%] sm:mx-auto mx-[2rem] flex flex-col gap-3 sm:p-10 py-10">
                        {/* Section 1 */}
                        <div className="flex flex-col gap-4">
                            <h2 className=" text-3xl font-semibold">
                                Courses to get you started
                            </h2>
                            <div className="flex gap-x-3 relative">
                                {tabs.map((tab, i) => (
                                    <p
                                        className={`${
                                            coursesType === tab
                                                ? "text-yellow-100 border-b-2 border-b-yellow-100"
                                                : "text-richblack-50"
                                        } cursor-pointer z-10`}
                                        key={i}
                                        onClick={() => changeCourses(tab)}
                                    >
                                        {tab}
                                    </p>
                                ))}
                                <div className="w-full h-[1px] bg-richblack-600 absolute bottom-0"></div>
                            </div>
                            <div>
                                <CourseSlider
                                    courses={
                                        coursesType === tabs[0]
                                            ? catalogPageData?.data
                                                  ?.selectedCategory?.courses
                                            : catalogPageData?.data
                                                  ?.mostSellingCourses
                                    }
                                />
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className=" flex flex-col gap-8">
                            <h2 className=" text-3xl font-semibold">
                                Top Courses in{" "}
                                {catalogPageData?.data?.differentCategory?.name}
                            </h2>
                            <div>
                                <CourseSlider
                                    courses={
                                        catalogPageData?.data?.differentCategory
                                            ?.courses
                                    }
                                />
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className=" text-3xl font-semibold">
                                Frequently Bought
                            </h2>
                            <div className="py-8">
                                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {catalogPageData?.data?.mostSellingCourses
                                        ?.slice(0, 4)
                                        .map((course, i) => (
                                            <CourseCard
                                                key={i}
                                                course={course}
                                                height={"h-[350px]"}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterSection />
                </div>
            )}
        </div>
    );
};

export default Catalog;

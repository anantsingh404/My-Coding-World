import React, { useEffect, useState } from "react";
import IconBtn from "../../common/IconBtn";
import { FaShareSquare } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import { useSelector } from "react-redux";

const CourseFloatingCard = ({
    course,
    handleAddToCart,
    handleBuyCourse,
    courseId,
    user,
}) => {
    const navigate = useNavigate();
    const { cart } = useSelector((state) => state.cart);
    const [inCartStatus, setInCartStatus] = useState(false);

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to Clipboard");
    };

    // console.log("cart dekh lo: ", cart[1]._id)
    // console.log("Course dekh lo: ", course._id)

    const isInCart = () => {
        if (cart.length < 1) {
            return;
        }
        cart.forEach((item) => {
            if (item._id === course._id) {
                setInCartStatus(true);
                console.log("true");
                return;
            }
        });
    };
    useEffect(() => {
        isInCart();
    }, []);

    return (
        <div className="w-[32%] relative">
            <div className="flex flex-col bg-richblack-700 rounded-lg absolute">
                <img
                    src={course?.thumbnail}
                    alt=""
                    className=" rounded-t-lg object-cover"
                />

                <div className="flex flex-col m-6 gap-4">
                    <p className=" text-2xl font-bold">
                        Rs. {course?.price.toString()}
                    </p>
                    {course?.studentsEnrolled?.includes(user?._id) ? (
                        <IconBtn
                            customClasses={
                                "bg-yellow-50 text-richblack-900 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-3 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                            }
                            onclick={
                                user &&
                                course?.studentsEnrolled?.includes(user?._id)
                                    ? () =>
                                          navigate(
                                              `/dashboard/enrolled-courses`
                                          )
                                    : handleBuyCourse()
                            }
                            text={"Go to Course"}
                        />
                    ) : (
                        <React.Fragment>
                            <IconBtn
                                customClasses={
                                    "bg-yellow-50 text-richblack-900 font-semibold flex items-center justify-center gap-2 rounded-lg px-5 py-3 shadow-[2px_2px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                                }
                                onclick={handleBuyCourse}
                                text={"Buy Now"}
                            />
                            {inCartStatus ? (
                                ""
                            ) : (
                                <IconBtn
                                    customClasses={
                                        "bg-richblack-800 text-richblack-5 font-medium flex items-center justify-center gap-2 rounded-lg px-5 py-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.28)] hover:scale-95 transition-all duration-200 hover:shadow-none"
                                    }
                                    onclick={() => {
                                        handleAddToCart();
                                        isInCart();
                                    }}
                                    text={"Add to cart"}
                                />
                            )}
                        </React.Fragment>
                    )}
                    <div>
                        <p className="flex justify-center text-sm text-richblack-50 git">
                            30-Days Money-Back Guarantee
                        </p>
                    </div>
                    <div>
                        <p className="text-xl font-semibold">
                            This course includes:{" "}
                        </p>
                        <div className="flex flex-col gap-2">
                            {course?.instructions.map((instruction, i) => (
                                <div
                                    className="flex my-1 items-center text-caribbeangreen-300 gap-1"
                                    key={i}
                                >
                                    <BiSolidRightArrow className="text-xs" />
                                    <span className=" font-medium">
                                        {instruction}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className="flex gap-1 w-full justify-center items-center my-2 font-medium text-yellow-50"
                        onClick={handleShare}
                    >
                        <FaShareSquare /> Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseFloatingCard;

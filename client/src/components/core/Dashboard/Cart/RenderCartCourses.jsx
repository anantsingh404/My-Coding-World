import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import ConfirmationModal from "../../../common/ConfirmationModal";
import getAvgRating from "../../../../utils/avgRating";

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log("Cart: ", cart);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const deleteHandler = (item) => {
        setConfirmationModal({
            text1: "Are you sure ?",
            text2: "Course will be removed from the cart.",
            btn1Text: "Remove",
            btn2Text: "Cancel",
            btn1Handler: () => {
                dispatch(removeFromCart(item));
                setConfirmationModal(null);
            },
            btn2Handler: () => {
                setConfirmationModal(null);
            },
        });
    };

    return (
        <div className="flex flex-col gap-8 sm:w-[80%] md:w-[50%] w-[90%]">
            {cart.map((item, i) => (
                <div className="w-full flex flex-col bg-richblack-800 p-4 rounded" key={i}>
                    <img
                        src={item?.thumbnail}
                        alt={`Item ${i + 1}`}
                        className="w-full rounded-lg"
                    />
                    <div className="w-full flex flex-col gap-2 my-2">
                        <p className="text-2xl font-bold">{`${item?.courseName.slice(
                            0,
                            65
                        )}${item?.courseName.length > 65 ? "..." : ""}`}</p>
                        <p className=" text-richblack-50 text-sm">
                            <span className=" text-richblack-5 font-medium">
                                Category:
                            </span>{" "}
                            {item?.category?.name}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">{getAvgRating(item?.ratingAndReviews)}</span>
                            <ReactStars
                                count={5}
                                size={15}
                                edit={false}
                                activeColor={"#E7C009"}
                                emptyIcon={<AiFillStar />}
                                fullIcon={<AiFillStar />}
                            />
                            <span className="text-yellow-50 text-sm">
                                ({item?.ratingAndReviews?.length} Ratings)
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className=" text-lg font-semibold text-yellow-50">
                            Rs. {item?.price}
                        </p>
                        <button
                            onClick={() => deleteHandler(item._id)}
                            className="flex items-center gap-1 bg-pink-200 rounded-md text-pink-800 px-2 py-1 font-medium"
                        >
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>
                    </div>
                </div>
            ))}
            {confirmationModal &&<ConfirmationModal modalData={confirmationModal}></ConfirmationModal>}
        </div>
    );
};

export default RenderCartCourses;

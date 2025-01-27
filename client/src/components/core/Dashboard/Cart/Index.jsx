import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {
    const { total, totalItems } = useSelector((state) => state.cart);
    return (
        <div className="text-richblack-5 flex flex-col gap-4">
            <h1 className=" font-medium text-3xl">Checkout:</h1>
            <p className=" text-richblack-100 border-b border-richblack-50">Order Summary ( {totalItems} Item(s) ):</p>
            {
                total > 0 ?
                (<div className="flex md:flex-row flex-col md:justify-between justify-center md:items-start items-center">
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>)
                :
                (<p className="text-3xl flex justify-center my-10">Your Cart is empty</p>)
            }
        </div>
    );
};

export default Cart;

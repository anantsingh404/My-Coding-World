import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import {buyCourse} from "../../../../services/operations/studentFeaturesAPI"
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart);
    const {token} = useSelector((state)=>state.auth)
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses,
            user,
            navigate,
            dispatch)
    };

    return (
        <div className="flex flex-col md:w-[30%] w-[85%] md:gap-12 gap-6 my-8 md:my-12 bg-richblack-800 outline-1 outline outline-richblack-700 p-3 rounded-lg items-center">
            <p className="lg:text-lg md:text-base text-sm">
                <span>Subtotal ({cart.length} items): </span> 
                <span className="text-yellow-50 font-medium">Rs {total}</span>
            </p>
            <IconBtn
                text="Buy Now"
                onclick={handleBuyCourse}
                customClasses={
                    "bg-yellow-50 text-richblack-900 font-medium flex items-center justify-center gap-2 rounded-lg px-4 py-2 shadow-[1.5px_1.5px_0px_0px_rgba(255,214,10,0.6)] hover:scale-95 transition-all duration-200 hover:shadow-none min-w-[130px] lg:min-w-[200px] "
                }
            />
        </div>
    );
};

export default RenderTotalAmount;

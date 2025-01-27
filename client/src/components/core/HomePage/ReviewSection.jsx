import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {
    Keyboard,
    Scrollbar,
    Autoplay,
    Pagination,
    Navigation,
    FreeMode,
} from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../../services/apiconnector";
import { ratingsEndpoints } from "../../../services/apis";

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const response = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            );
            const { data } = response;
            if (data?.success) {
                setReviews(data.data);
            }
            // console.log("reviews: ", reviews);
        };
        fetchAllReviews();
    }, []);

    const convertReviewWords = (sentence) => {
        let newSentence = sentence.split(" ");
        newSentence = newSentence.slice(0, 15).join(" ");
        return newSentence;
    };

    return (
        <div className="text-richblack-5 lg:w-[80%]">
            <div className=" h-[190px] max-w-maxContent">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction:false
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full"
                >
                    {reviews.map((review, i) => (
                        <SwiperSlide
                            key={i}
                            className=" max-w-maxContent bg-richblack-800 border border-richblack-600 rounded-sm px-3 py-5 lg:min-w-[300px]"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-4 max-w-maxContent items-center">
                                    <img
                                        src={
                                            review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}%20${review?.user?.lastName}`
                                        }
                                        alt="user pic"
                                        className="h-9 w-9 object-cover rounded-full"
                                    />
                                    <div className="flex flex-col max-w-maxContent">
                                        <p className=" font-semibold text-sm">
                                            {review?.user?.firstName}{" "}
                                            {review?.user?.lastName}
                                        </p>
                                        <p className=" text-richblack-200 font-medium text-xs">
                                            {review?.course?.courseName}
                                        </p>
                                    </div>
                                </div>
                                <p className=" text-richblack-25 text-sm">
                                    {convertReviewWords(review?.review)}
                                </p>
                                <div className="flex gap-2 items-center">
                                    <p className="text-yellow-50 font-medium text-sm">
                                        {review?.rating.toFixed(1)}
                                    </p>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={16}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewSection;

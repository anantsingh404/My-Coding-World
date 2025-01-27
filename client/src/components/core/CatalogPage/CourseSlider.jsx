import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Keyboard, Scrollbar, Autoplay, Pagination, Navigation } from "swiper/modules";
import CourseCard from "./CourseCard";

const CourseSlider = ({ courses }) => {
  const swiper = useSwiper()
    return (
        <>
            {courses?.length ? (
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#E7C009",
                        "--swiper-pagination-bullet-inactive-color": "#999DAA",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "12px",
                        "--swiper-pagination-bullet-horizontal-gap": "3px",
                    }}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={false}
                    slidesPerGroupSkip={1}
                    grabCursor={true}
                    keyboard={{
                        enabled: true,
                    }}
                    breakpoints={{
                        769: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                        },
                        1024:{
                          slidesPerView: 3,
                          slidesPerGroup: 3,
                        }
                    }}
                    scrollbar={true}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {courses.map((course, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard course={course} height={"sm:h-[200px] h-[350px]"} width="sm:max-w-[350px] max-w-[620px]" />
                        </SwiperSlide>
                    ))}
                    {swiper?.isEnd? swiper.changeDirection : ""}
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )}
        </>
    );
};

export default CourseSlider;

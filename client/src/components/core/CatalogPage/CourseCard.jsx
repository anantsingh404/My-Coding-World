import React, { useEffect } from 'react'
import RatingStars from "../../common/RatingStars"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import getAvgRating from '../../../utils/avgRating'

const CourseCard = ({course, height, width="w-auto"}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(()=>{
        const count = getAvgRating(course?.ratingAndReviews)
        setAvgReviewCount(count)
    },[])

  return (
    <div className='text-richblack-5 mb-4'>
        <Link to={`/courses/${course._id}`}>
            <div className='mb-4'>
                <img src={course?.thumbnail} alt="thumbnail of course" className={`${height} ${width} object-cover w-full rounded-xl`}/>
            </div>
            <div className='flex flex-col gap-2'>
                <p className=' text-xl font-medium'>{course?.courseName}</p>
                <p className=' text-richblack-300'>{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</p>
                <div className='flex items-center gap-2'>
                    <span className='text-yellow-100 font-semibold'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount} />
                    <span className=' text-richblack-400'>({course?.ratingAndReviews?.length} ratings)</span>
                </div>
                <p className=' text-lg font-semibold'>Rs. {course?.price}</p>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard
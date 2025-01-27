import React from 'react'
import {TiStarFullOutline, TiStarHalfOutline, TiStarOutline} from "react-icons/ti"
import { useEffect, useState } from 'react'

const RatingStars = ({Review_Count, Star_Size}) => {
  const [starsCount, setStarsCount] = useState({
    full:0,
    half:0,
    empty:0
  })
  useEffect(()=>{
    const wholeStars = Math.floor(Review_Count)||0
    setStarsCount({
        full:wholeStars,
        half: Number.isInteger(Review_Count)? 0:1,
        empty: Number.isInteger(Review_Count)? 5-wholeStars : 4-wholeStars
    })
  },[Review_Count])

  return(
    <div className='flex gap-[0px] text-yellow-100'>
        {[...new Array(starsCount.full)].map((_,i)=>{
            return <TiStarFullOutline key={i} size={Star_Size ||18}/>
        })}
        {[...new Array(starsCount.half)].map((_,i)=>{
            return <TiStarHalfOutline key={i} size={Star_Size ||18}/>
        })}
        {[...new Array(starsCount.empty)].map((_,i)=>{
            return <TiStarOutline key={i} size={Star_Size ||18}/>
        })}
    </div>
  )

}

export default RatingStars
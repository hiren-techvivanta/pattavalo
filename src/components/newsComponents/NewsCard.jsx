import React from 'react'
import { MdArrowOutward } from "react-icons/md";

const NewsCard = ({props}) => {
  return (
    <>
        <div className='flex flex-col align-top justify-around gap-[10px]'>
            <img src={props.image} className='w-[194px] md:w-[100%] h-[245px] md:h-[245px] lg:h-[356px] object-cover' alt="img" />
            <p className='font-[600] text-[#868686]'>{props.news}</p>
            <div className='flex justify-between'>
                  <p className='text-[21px] font-[500]'>{props.heading}</p>
                  <MdArrowOutward className='text-[21px]' />
            </div>
            <p className='text-[14px] text-[#667085]'>{props.details}</p>
        </div>
    </>
  )
}

export default NewsCard
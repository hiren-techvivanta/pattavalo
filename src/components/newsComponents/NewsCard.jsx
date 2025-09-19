import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ props }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="border border-[#0A0D170D] rounded-[8px]"
        onClick={() => navigate(`/blog/details`)}
      >
        <img
          src={props.image}
          className="w-[194px] md:w-[100%] h-[245px] md:h-[245px] lg:h-[356px] object-cover rounded-t-[8px]"
          alt="img"
        />
       <div className="md:p-[23px] p-[15px]">
         <p className="font-[600] text-[9px] md:text-[12px] text-[#868686] pb-1">{props.news}</p>
        <div className="flex justify-between">
          <p className="md:text-[21px] text-[14px] font-[500] py-1">{props.heading}</p>
          <MdArrowOutward className="text-[21px]  py-1" />
        </div>
        <p className="md:text-[14px] text-[10px] text-[#667085] py-1">{props.details}</p>
       </div>
      </div>
    </>
  );
};

export default NewsCard;
